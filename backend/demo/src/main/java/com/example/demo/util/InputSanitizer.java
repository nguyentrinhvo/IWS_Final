package com.example.demo.util;

import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Component;

/**
 * Input Sanitization Utility.
 * Strips unwanted/dangerous HTML tags and attributes to prevent XSS attacks.
 *
 * <p>Usage:
 * <pre>
 *   String safe = inputSanitizer.sanitize(userInput);
 * </pre>
 */
@Component
public class InputSanitizer {

    /**
     * Strips ALL HTML tags — returns plain text only.
     * Use for fields like names, emails, codes, etc.
     */
    public String sanitize(String input) {
        if (input == null) {
            return null;
        }
        return Jsoup.clean(input.trim(), Safelist.none());
    }

    /**
     * Allows a safe subset of HTML (bold, italic, links, lists).
     * Use for rich-text fields like tour descriptions.
     */
    public String sanitizeRichText(String input) {
        if (input == null) {
            return null;
        }
        return Jsoup.clean(input.trim(), Safelist.basic());
    }

    /**
     * Strips all HTML but preserves line breaks (converts <br> to \n).
     * Use for multi-line plain-text fields like notes/comments.
     */
    public String sanitizePlainMultiline(String input) {
        if (input == null) {
            return null;
        }
        // Replace <br> variants before stripping
        String withNewlines = input.replaceAll("(?i)<br\\s*/?>", "\n");
        return Jsoup.clean(withNewlines.trim(), Safelist.none());
    }
}
