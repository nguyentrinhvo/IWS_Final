package com.example.demo.config;

import com.example.demo.security.JwtAuthFilter;
import com.example.demo.util.RateLimitFilter;
import lombok.RequiredArgsConstructor;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final RateLimitFilter rateLimitFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public FilterRegistrationBean<RateLimitFilter> skipAutoRegistration(RateLimitFilter filter) {
        FilterRegistrationBean<RateLimitFilter> registration = new FilterRegistrationBean<>(filter);
        registration.setEnabled(false);
        return registration;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // ── OWASP Security Headers ──────────────────────────────────────
                .headers(headers -> headers
                        // X-Frame-Options: DENY — prevents clickjacking
                        .frameOptions(frame -> frame.deny())
                        // X-Content-Type-Options: nosniff — prevents MIME sniffing
                        .contentTypeOptions(contentType -> {
                        })
                        // HSTS: force HTTPS for 1 year (includeSubDomains)
                        .httpStrictTransportSecurity(hsts -> hsts
                                .maxAgeInSeconds(31536000)
                                .includeSubDomains(true))
                        // Content-Security-Policy
                        .contentSecurityPolicy(csp -> csp
                                .policyDirectives(
                                        "default-src 'self'; " +
                                                "script-src 'self'; " +
                                                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                                                "font-src 'self' https://fonts.gstatic.com; " +
                                                "img-src 'self' data: https:; " +
                                                "connect-src 'self'; " +
                                                "frame-ancestors 'none';"))
                        // Referrer-Policy: strict-origin-when-cross-origin
                        .referrerPolicy(referrer -> referrer
                                .policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
                        // X-XSS-Protection: 0 (disabled — CSP is the modern replacement)
                        .xssProtection(xss -> xss.disable()))
                // ────────────────────────────────────────────────────────────────

            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api-docs/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/api/categories").permitAll()
                .requestMatchers("/api/tours/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/attractions").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/attractions/{id}").permitAll()
                // Payment gateway callbacks (VNPay / PayPal redirects — no JWT)
                .requestMatchers("/api/payment/vnpay-return").permitAll()
                .requestMatchers("/api/payment/paypal/success").permitAll()
                .requestMatchers("/api/payment/paypal/cancel").permitAll()

                        .anyRequest().authenticated());

        // Rate limit filter runs first, then JWT auth
        http.addFilterBefore(rateLimitFilter,
                org.springframework.security.web.context.SecurityContextHolderFilter.class);
        http.addFilterAfter(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
