package de.osiem.leaguechat.conversations.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Participant{
    private String name;
    private String avatar;
}