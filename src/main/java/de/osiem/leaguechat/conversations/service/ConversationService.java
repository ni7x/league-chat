package de.osiem.leaguechat.conversations.service;

import java.util.Set;

import de.osiem.leaguechat.conversations.model.Conversation;
import de.osiem.leaguechat.conversations.model.Message;
import de.osiem.leaguechat.conversations.model.MessageDto;
import de.osiem.leaguechat.user.model.user.User;

public interface ConversationService {
    Conversation createConversation(Set<User> users);
    void deleteConversation(Conversation conversation);
    Message createMessage(MessageDto message);
}
