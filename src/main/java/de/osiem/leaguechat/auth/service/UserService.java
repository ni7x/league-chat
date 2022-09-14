package de.osiem.leaguechat.auth.service;

import java.util.List;

import de.osiem.leaguechat.auth.model.Role;
import de.osiem.leaguechat.auth.model.User;

public interface UserService {
    
    User saveUser(User user);
    Role saveRole(Role role);
    void addRoleToUser(String username, String roleName);
    User getUser(String username);
    List<User> getUsers();

}
