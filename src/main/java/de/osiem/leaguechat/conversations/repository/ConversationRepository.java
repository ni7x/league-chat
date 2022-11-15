package de.osiem.leaguechat.conversations.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.osiem.leaguechat.conversations.model.Conversation;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    
}
