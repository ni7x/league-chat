package de.osiem.leaguechat.conversations.model;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class  ConversationDto{
    private String name;
    private Set<Long> ids;
}

