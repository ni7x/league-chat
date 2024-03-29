package de.osiem.leaguechat.conversations.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConversationPreview {
    @JsonIgnoreProperties({"conversations"})
    private Message lastMessage;
    private Set<Participant> participants;
    private Long id;
    private String name;

}
