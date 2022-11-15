package de.osiem.leaguechat.conversations.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import de.osiem.leaguechat.conversations.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
