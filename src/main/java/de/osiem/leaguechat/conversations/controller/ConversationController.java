package de.osiem.leaguechat.conversations.controller;

import java.util.List;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import de.osiem.leaguechat.conversations.model.Conversation;
import de.osiem.leaguechat.conversations.model.ConversationDto;
import de.osiem.leaguechat.conversations.model.MessageDto;
import de.osiem.leaguechat.conversations.service.ConversationService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class ConversationController {
    private final ConversationService service;
    private final SimpMessagingTemplate template;



    @MessageMapping("/conversation/{conversationId}") // handles messages in app/conversatioon
   // @SendTo("/message/private") // sends to 
    public void send(MessageDto message, @DestinationVariable Long conversationId) throws Exception {
        template.convertAndSend("/message/private/" + message.getConversationId(), service.createMessage(message));
    }

    @GetMapping("api/conversation/")
    public List<ConversationDto> getAllConversations(Authentication authentication){
        return service.getAllConversations(authentication.getName());
    }

    @GetMapping("api/conversations/")
    public List<ConversationDto> getAllConversations2(){
        return service.getAllConversations();
    }
    

    @GetMapping("api/conversation/id/{conversationId}")
    public Conversation getConversation(Authentication authentication, @PathVariable Long conversationId){
        return service.getConversation(conversationId);
    }
    
}

