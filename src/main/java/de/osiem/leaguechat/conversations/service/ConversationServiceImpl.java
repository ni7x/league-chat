package de.osiem.leaguechat.conversations.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import de.osiem.leaguechat.conversations.model.Conversation;
import de.osiem.leaguechat.conversations.model.ConversationDto;
import de.osiem.leaguechat.conversations.model.Message;
import de.osiem.leaguechat.conversations.model.MessageDto;
import de.osiem.leaguechat.conversations.model.Participant;
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
    public Conversation getConversation(Long conversationId) {
        return conversationRepository.findById(conversationId).get();
    }
    
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
    public void deleteMessage(Message message){
        messageRepository.delete(message);
    }

    @Override
    public void deleteConversation(Conversation conversation) {
        conversationRepository.delete(conversation); 
    }

    @Override
    public Message createMessage(MessageDto message) {
        Message newMessage = new Message();
        Optional<User> author = userRepository.findById(message.getAuthorId());
        System.out.println(author);//don't touch xd
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

    @Override
    public List<ConversationDto> getAllConversations(String name) {
        List<ConversationDto> conversationList = new ArrayList<>();
        User user = userRepository.findByUsername(name);
        for(Conversation conv: user.getConversations()){
            Set<Participant> participants = new HashSet<>();
            conv.getParticipants().forEach(participant->participants.add(new Participant(participant.getIngameName(), participant.getAvatar())));
            conversationList.add(new ConversationDto(conv.getLastMessage(), participants, conv.getId()));
        }
        return conversationList;
    }

    
    public List<ConversationDto> getAllConversations() {
        List<ConversationDto> conversationList = new ArrayList<>();
        for(Conversation conv: conversationRepository.findAll()){
            Set<Participant> participants = new HashSet<>();
            conv.getParticipants().forEach(participant->participants.add(new Participant(participant.getIngameName(), participant.getAvatar())));
            conversationList.add(new ConversationDto(conv.getLastMessage(), participants, conv.getId()));
        }
        return conversationList;
    }

}
