package de.osiem.leaguechat.auth.service;

import java.util.List;

import org.springframework.web.server.ResponseStatusException;

import de.osiem.leaguechat.auth.model.friendRequest.FriendRequest;
import de.osiem.leaguechat.auth.model.user.User;

public interface UserService {
    //user
    User saveUser(User user) throws ResponseStatusException;
    User getUser(String username) throws ResponseStatusException;
    User getUserByIGNandServer(String ingameName, String string) throws ResponseStatusException;
    void deleteUser(String name) throws ResponseStatusException;
    User updateUser(User user) throws ResponseStatusException;
    User getUserById(Long id);

    //friends
    User endFriendship(User user, User friend) throws ResponseStatusException;
    User sendFriendRequest(User from, User to) throws ResponseStatusException;
    FriendRequest getFriendRequest(Long id) throws ResponseStatusException;
    User acceptFriendRequest(Long id) throws ResponseStatusException;
    User rejectFriendRequest(Long id) throws ResponseStatusException;
    User cancelFriendRequest(Long id);

    //admin
    List<User> getUsers();
    void addRoleToUser(String username, Object role);


}
