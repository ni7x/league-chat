package de.osiem.leaguechat.conversations.service;

import java.util.List;
import java.util.Set;

import de.osiem.leaguechat.conversations.model.Conversation;
import de.osiem.leaguechat.conversations.model.ConversationDto;
import de.osiem.leaguechat.conversations.model.ConversationPreview;
import de.osiem.leaguechat.conversations.model.Message;
import de.osiem.leaguechat.conversations.model.MessageDto;
import de.osiem.leaguechat.user.model.user.User;

public interface ConversationService {
    Conversation createConversation(Set<User> users);
    ConversationPreview createConversation(ConversationDto conversationDto);
    void deleteConversation(Conversation conversation);
    Conversation getConversation(Long conversationId);
    Conversation leaveConversation(Long coversationId, String name);


    Message createMessage(MessageDto message);
    void deleteMessage(Long messageId);
    
    List<ConversationPreview> getAllConversations(String name);
    List<ConversationPreview> getAllConversations();
}
