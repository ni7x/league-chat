package de.osiem.leaguechat.conversations.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private Long conversationId;
    private Long authorId;
    private String content;
}
