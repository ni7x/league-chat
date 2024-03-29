package de.osiem.leaguechat.conversations.wsConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry) {
        stompEndpointRegistry.addEndpoint("/stomp").setAllowedOriginPatterns("*").withSockJS(); //there will take place connection
        stompEndpointRegistry.addEndpoint("/stompOnly").setAllowedOriginPatterns("*"); //there will take place connection
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/message");//where to get messages
        registry.setApplicationDestinationPrefixes("/app");//where to send messasges
    }
}