package de.osiem.leaguechat.conversations.model;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConversationDto {
    @JsonIgnoreProperties({"conversations"})
    private Message lastMessage;
    private Set<Participant> participants;
    private Long id;

}
