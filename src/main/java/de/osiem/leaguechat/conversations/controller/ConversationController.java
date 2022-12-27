package de.osiem.leaguechat.conversations.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import de.osiem.leaguechat.conversations.model.Conversation;
import de.osiem.leaguechat.conversations.model.ConversationDto;
import de.osiem.leaguechat.conversations.model.ConversationPreview;
import de.osiem.leaguechat.conversations.model.MessageDto;
import de.osiem.leaguechat.conversations.service.ConversationService;
import lombok.AllArgsConstructor;
import lombok.Data;

@RestController
@AllArgsConstructor
public class ConversationController {
    private final ConversationService service;
    private final SimpMessagingTemplate template;



    @MessageMapping("/conversation/{conversationId}") // handles messages in app/conversatioon
   // @SendTo("/message/private") // sends to 
    public void send(MessageDto message, @DestinationVariable Long conversationId) throws Exception {
        template.convertAndSend("/message/private/" + message.getConversationId(), new ResponseAction("CREATE",  service.createMessage(message)));
    }

    @MessageMapping("/conversation/{conversationId}/delete") // handles messages in app/conversatioon
    // @SendTo("/message/private") // sends to 
     public void delete(Long messageId, @DestinationVariable Long conversationId) throws Exception {
         service.deleteMessage(messageId);
         template.convertAndSend("/message/private/" + conversationId, new ResponseAction("DELETE",  messageId));
     }

    @GetMapping("api/conversation/")
    public List<ConversationPreview> getAllConversations(Authentication authentication){
        return service.getAllConversations(authentication.getName());
    }

    @PostMapping("api/conversation/")
    public Conversation createConversation(Authentication authentication, @RequestBody ConversationDto conversationDto){
        return service.createConversation(conversationDto);
    }

    @GetMapping("api/conversations/")
    public List<ConversationPreview> getAllConversations2(){
        return service.getAllConversations();
    }
    

    @GetMapping("api/conversation/id/{conversationId}")
    public Conversation getConversation(Authentication authentication, @PathVariable Long conversationId){
        Conversation conversation = service.getConversation(conversationId);
        if(conversation.getParticipants().stream().anyMatch(participant -> authentication.getName().equals(participant.getUsername()))){
            return service.getConversation(conversationId);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }
    
}

@Data
@AllArgsConstructor
class ResponseAction {
    private String type;
    private Object value;
}
