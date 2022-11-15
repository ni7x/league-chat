package de.osiem.leaguechat.conversations.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import de.osiem.leaguechat.conversations.model.Conversation;
import de.osiem.leaguechat.conversations.model.Message;
import de.osiem.leaguechat.conversations.model.MessageDto;
import de.osiem.leaguechat.conversations.repository.ConversationRepository;
import de.osiem.leaguechat.conversations.repository.MessageRepository;
import de.osiem.leaguechat.user.model.user.User;
import de.osiem.leaguechat.user.repository.UserRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional
public class ConversationServiceImpl implements ConversationService{
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    
    @Override
    public Conversation createConversation(Set<User> users) {
        Conversation conversation = new Conversation();
        conversation.setParticipants(users);
        conversationRepository.save(conversation);
        for(User user: users){
            user.getConversations().add(conversation);
        }
        
        return conversation;
    }

    @Override
    public void deleteConversation(Conversation conversation) {
        conversationRepository.delete(conversation); 
    }

    @Override
    public Message createMessage(MessageDto message) {
        Message newMessage = new Message();
        System.out.println(message);
        Optional<User> author = userRepository.findById(message.getAuthorId());
        Optional<Conversation> conversation = conversationRepository.findById(message.getConversationId());
        if(author.isPresent() && conversation.isPresent()){
            newMessage.setAuthor(author.get());
            newMessage.setConversation(conversation.get());
            newMessage.setContent(message.getContent());
            conversation.get().getMessages().add(newMessage);
            return messageRepository.save(newMessage);
        }

        return null;    
    }

}
