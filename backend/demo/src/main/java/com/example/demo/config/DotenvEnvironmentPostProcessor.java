package com.example.demo.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.Ordered;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

public class DotenvEnvironmentPostProcessor
        implements ApplicationListener<ApplicationEnvironmentPreparedEvent>, Ordered {

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }

    @Override
    public void onApplicationEvent(ApplicationEnvironmentPreparedEvent event) {
        System.out.println(">>> [DotenvLoader] Loading .env file...");
        System.out.println(">>> [DotenvLoader] Working directory: " + System.getProperty("user.dir"));

        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();

        Map<String, Object> props = new HashMap<>();

        // Chỉ lấy entries khai báo trong file .env (không bao gồm system env vars)
        dotenv.entries(Dotenv.Filter.DECLARED_IN_ENV_FILE)
              .forEach(e -> props.put(e.getKey(), e.getValue()));

        System.out.println(">>> [DotenvLoader] Entries found: " + props.size());

        // Đặt thẳng giá trị vào Spring properties (không dùng placeholder)
        String mongoUri = dotenv.get("MONGODB_URI", null);
        if (mongoUri != null) {
            props.put("spring.data.mongodb.uri", mongoUri);
            System.out.println(">>> [DotenvLoader] MongoDB URI set: " + mongoUri.substring(0, 30) + "...");
        } else {
            System.out.println(">>> [DotenvLoader] WARNING: MONGODB_URI not found in .env!");
        }

        String jwtSecret = dotenv.get("JWT_SECRET", null);
        if (jwtSecret != null) props.put("app.jwt.secret", jwtSecret);

        String mailUser = dotenv.get("MAIL_USERNAME", null);
        if (mailUser != null) props.put("spring.mail.username", mailUser);

        String mailPass = dotenv.get("MAIL_PASSWORD", null);
        if (mailPass != null) props.put("spring.mail.password", mailPass);

        event.getEnvironment().getPropertySources()
                .addFirst(new MapPropertySource("dotenvProperties", props));

        System.out.println(">>> [DotenvLoader] Properties injected into Spring Environment.");
    }
}
