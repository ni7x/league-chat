package de.osiem.leaguechat.auth.service;

import java.util.List;

import org.springframework.web.server.ResponseStatusException;

import de.osiem.leaguechat.auth.model.friendRequest.FriendRequest;
import de.osiem.leaguechat.auth.model.user.User;

public interface UserService {
    //user
    User saveUser(User user) throws ResponseStatusException;
    User getUser(String username) throws ResponseStatusException;
    void deleteUser(String name) throws ResponseStatusException;
    User updateUser(User user) throws ResponseStatusException;

    //friends
    User removeFriend(String username, String friendName);
    void sendFriendRequest(String from, String to);
    FriendRequest getFriendRequest(Long id);
    User acceptFriendRequest(Long id);
    User rejectFriendRequest(Long id);

    //admin
    List<User> getUsers();
    void addRoleToUser(String username, Object role);

}
