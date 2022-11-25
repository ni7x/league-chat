package de.osiem.leaguechat.conversations.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConversationDto {
    private Message lastMessage;
    private List<String> participantsNames;
    private Long id;
}
