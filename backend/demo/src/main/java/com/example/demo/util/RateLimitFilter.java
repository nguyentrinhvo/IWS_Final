package com.example.demo.util;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Rate Limiting Filter using Bucket4j.
 * Limits each client IP to 100 requests per minute.
 * Returns HTTP 429 Too Many Requests when the limit is exceeded.
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    // Max requests per window
    private static final int CAPACITY = 100;
    // Refill window: 1 minute
    private static final Duration REFILL_DURATION = Duration.ofMinutes(1);

    // Per-IP bucket store
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    /**
     * Resolves or creates a token bucket for the given client IP.
     */
    private Bucket resolveBucket(String clientIp) {
        return buckets.computeIfAbsent(clientIp, ip -> {
            Bandwidth limit = Bandwidth.builder()
                    .capacity(CAPACITY)
                    .refillGreedy(CAPACITY, REFILL_DURATION)
                    .build();
            return Bucket.builder().addLimit(limit).build();
        });
    }

    /**
     * Extracts the real client IP, respecting X-Forwarded-For (proxy/load balancer).
     */
    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            // Take only the first IP in the chain
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String clientIp = getClientIp(request);
        Bucket bucket = resolveBucket(clientIp);

        if (bucket.tryConsume(1)) {
            // Expose remaining tokens in response header (useful for API clients)
            response.setHeader("X-Rate-Limit-Remaining",
                    String.valueOf(bucket.getAvailableTokens()));
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(
                    "{\"status\":429,\"error\":\"Too Many Requests\"," +
                    "\"message\":\"Rate limit exceeded. Max 100 requests per minute.\"}");
        }
    }
}
