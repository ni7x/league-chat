package de.osiem.leaguechat.user.service;

import java.util.List;

import org.springframework.web.server.ResponseStatusException;

import de.osiem.leaguechat.user.model.friendRequest.FriendRequest;
import de.osiem.leaguechat.user.model.resetPasswordToken.ResetPasswordToken;
import de.osiem.leaguechat.user.model.user.User;
import de.osiem.leaguechat.user.model.user.UserDto;

public interface UserService {
    //user
    User saveUser(User user) throws ResponseStatusException;
    User getUser(String username) throws ResponseStatusException;
    User getUserByIGNandServer(String ingameName, String string) throws ResponseStatusException;
    void deleteUser(String name) throws ResponseStatusException;
    User updateUser(UserDto user) throws ResponseStatusException;
    User getUserById(Long id) throws ResponseStatusException;
    User getUserByEmail(String email) throws ResponseStatusException;
    void updatePassword(User user, String password) throws ResponseStatusException;

    List<String> getIngameNameSuggestions(String suggested_ign, String server, String current_user_ign);


    //reset token
    ResetPasswordToken createResetPasswordToken(User user, String token);

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
    ResetPasswordToken getByToken(String token);


}
