package de.osiem.leaguechat.conversations.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Participant{
    private String ingameName;
    private Long id;
    private String avatar;
}