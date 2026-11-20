package com.example.demo.security;

import com.example.demo.document.UserDocument;
import com.example.demo.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String registrationId = ((org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId();
        
        String email = oAuth2User.getAttribute("email");
        if (email == null) {
            String id = oAuth2User.getAttribute("id") != null ? oAuth2User.getAttribute("id").toString() : oAuth2User.getAttribute("sub").toString();
            email = id + "@" + registrationId + ".com";
        }
        
        final String finalEmail = email;
        UserDocument user = userRepository.findByEmail(finalEmail)
                .orElseThrow(() -> new ServletException("User not found after OAuth2 login: " + finalEmail));

        String token = tokenProvider.generateToken(user.getEmail(), user.getRole());

        String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/auth/callback")
                .queryParam("token", token)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
