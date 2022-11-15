package de.osiem.leaguechat.conversations.model;

import lombok.Data;

@Data
public class MessageDto {
    private long conversationId;
    private long authorId;
    private String content;
}
