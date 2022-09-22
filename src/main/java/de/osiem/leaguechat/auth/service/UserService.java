package de.osiem.leaguechat.auth.service;

import java.util.List;

import de.osiem.leaguechat.auth.model.user.User;

public interface UserService {
    User saveUser(User user) throws Exception;
    void addRoleToUser(String username, Object role);
    User getUser(String username);
    List<User> getUsers();
    void addPositionToUser(String username, Object position);
    User addFriendToUser(String username, String friendName);
    void deleteUser(String name);
    User updateUser(User user) throws Exception;
    User removeFriendFromUser(String username, String friendName);
}
