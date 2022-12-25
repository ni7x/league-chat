package de.osiem.leaguechat.user.model.user;

import java.util.Set;
import lombok.Data;

@Data
public class UserDto{
    private Long id;
    private String username;
    private String ingameName;
    private String password;
    private String server;
    private String email;
    private Set<Position> positions;
    private String avatar;
}