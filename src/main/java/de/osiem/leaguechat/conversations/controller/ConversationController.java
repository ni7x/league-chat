package de.osiem.leaguechat.conversations.controller;

import java.util.List;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import de.osiem.leaguechat.conversations.model.Conversation;
import de.osiem.leaguechat.conversations.model.ConversationDto;
import de.osiem.leaguechat.conversations.model.Message;
import de.osiem.leaguechat.conversations.model.MessageDto;
import de.osiem.leaguechat.conversations.service.ConversationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/api/conversation/")
@CrossOrigin(origins = "http://localhost:3000")
public class ConversationController {
    private final ConversationService service;

    /*@PostMapping("/conversation/createMessage")
    public Message createMessage(@RequestBody MessageDto message, Authentication authentication) {
       return service.createMessage(message);
    }*/

    @MessageMapping("newMessage") // gdzie wyslac
    @SendTo("{conversationId}") // gdzie otrzymac
    public MessageDto send(@Payload MessageDto message,  Authentication authentication, @PathVariable Long id) throws Exception {
        service.createMessage(message);
        return message;
    }

    @GetMapping("")
    public List<ConversationDto> getAllConversations(Authentication authentication){
        return service.getAllConversations(authentication.getName());
    }
    

    @GetMapping("id/{conversationId}")
    public Conversation getConversation(Authentication authentication, @PathVariable Long conversationId){
        return service.getConversation(conversationId);
    }
    
}

