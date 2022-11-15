package de.osiem.leaguechat.conversations.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import de.osiem.leaguechat.conversations.model.Message;
import de.osiem.leaguechat.conversations.model.MessageDto;
import de.osiem.leaguechat.conversations.service.ConversationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ConversationController {
    private final ConversationService service;

    @PostMapping("/conversation/createMessage")
    public Message createMessage(@RequestBody MessageDto message, Authentication authentication) {
       return service.createMessage(message);
    }
    
}

