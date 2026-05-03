package com.example.demo.security;

import com.example.demo.document.UserDocument;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        
        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // "google" or "facebook"
        Map<String, Object> attributes = oAuth2User.getAttributes();
        
        String email = (String) attributes.get("email");
        if (email == null) {
            // Nếu không có email (thường gặp với Facebook), dùng ID làm định danh
            String id = attributes.get("id") != null ? attributes.get("id").toString() : attributes.get("sub").toString();
            email = id + "@" + registrationId + ".com";
        }

        Optional<UserDocument> userOptional = userRepository.findByEmail(email);
        UserDocument user;
        
        if (userOptional.isPresent()) {
            user = userOptional.get();
            // Update existing user info if needed
            user.setProvider(registrationId);
            updateExistingUser(user, attributes);
        } else {
            user = registerNewUser(registrationId, attributes, email);
        }

        return oAuth2User;
    }

    private UserDocument registerNewUser(String registrationId, Map<String, Object> attributes, String email) {
        String fullName = (String) attributes.get("name");
        if (fullName == null) {
            fullName = (String) attributes.get("first_name") + " " + (String) attributes.get("last_name");
        }
        if (fullName == null || fullName.trim().isEmpty() || fullName.equals("null null")) {
            fullName = "Social User " + (attributes.get("id") != null ? attributes.get("id") : attributes.get("sub"));
        }
        
        String avatarUrl = (String) attributes.get("picture");
        if (registrationId.equals("google") && attributes.containsKey("picture")) {
            avatarUrl = (String) attributes.get("picture");
        } else if (registrationId.equals("facebook") && attributes.containsKey("picture")) {
            Map<String, Object> picture = (Map<String, Object>) attributes.get("picture");
            Map<String, Object> data = (Map<String, Object>) picture.get("data");
            avatarUrl = (String) data.get("url");
        }

        UserDocument user = UserDocument.builder()
                .email(email)
                .fullName(fullName)
                .avatarUrl(avatarUrl)
                .provider(registrationId)
                .role("customer")
                .isLocked(false)
                .language("vi")
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();
        
        return userRepository.save(user);
    }

    private void updateExistingUser(UserDocument user, Map<String, Object> attributes) {
        String fullName = (String) attributes.get("name");
        if (fullName != null) {
            user.setFullName(fullName);
        }
        user.setUpdatedAt(new Date());
        userRepository.save(user);
    }
}
