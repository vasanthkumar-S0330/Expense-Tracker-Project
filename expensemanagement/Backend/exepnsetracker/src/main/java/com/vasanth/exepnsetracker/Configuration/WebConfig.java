package com.vasanth.exepnsetracker.Configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig{


    @Configuration
    public static class webConfig implements WebMvcConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            // Allow requests from your frontend URL (adjust if necessary)
            registry.addMapping("/**")
                    .allowedOrigins("*") // Replace with your frontend URL
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*")
                    .allowCredentials(false);  // If needed
        }
    }

}

