package de.osiem.leaguechat.auth.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import de.osiem.leaguechat.auth.model.friendRequest.FriendRequest;
import de.osiem.leaguechat.auth.model.user.Position;
import de.osiem.leaguechat.auth.model.user.Role;
import de.osiem.leaguechat.auth.model.user.Server;
import de.osiem.leaguechat.auth.model.user.User;
import de.osiem.leaguechat.auth.repository.FriendRequestRepository;
import de.osiem.leaguechat.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional // don't have to use save when modyfing user
@RequiredArgsConstructor // instead of making autowired constructors and injecting repositores
@Slf4j
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final FriendRequestRepository frRepository;
    private final PasswordEncoder passwordEncoder;
    private static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$";

    private static boolean isPasswordValid(String password){
        return password.matches(PASSWORD_PATTERN);
    }

    private boolean isUsernameUnique(String username){
        return !userRepository.existsByUsername(username);
    }

    private boolean isIngameNameUnqiue(String ingameName, Server server){
        return !userRepository.existsByIngameNameAndServer(ingameName, server);
    }

    @Override
    public User saveUser(User user) throws ResponseStatusException{

        String username = user.getUsername();
        String ingameName = user.getIngameName();
        String password = user.getPassword();
        Server server = user.getServer();

        if(isUsernameUnique(username)){
            if(isIngameNameUnqiue(ingameName, server)){
                if(isPasswordValid(password)){
                    user.setPassword(passwordEncoder.encode(password));
                    user.getRoles().add(Role.USER);
                    user.getPositions().add(Position.FILL);
                    userRepository.save(user);
                    return user;
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Password is not valid");
                }
            }else{
                throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Ingame name is not unique on this server");
            }
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Username is not unique");
        }
    }

    @Override
    public User updateUser(User updatedUser) throws ResponseStatusException{
        User user = userRepository.findById(updatedUser.getId()).get();
        if(user != null){
            String currentUsername = user.getUsername();
            String newUsername = updatedUser.getUsername();
            if(!currentUsername.equals(newUsername)){
                if(isUsernameUnique(newUsername)){
                    user.setUsername(newUsername);
                }else{                    
                    throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Username is not unique");
                }
            }

            Server currentServer = user.getServer();
            Server newServer = updatedUser.getServer();
            if(!currentServer.equals(newServer)){
                if(isIngameNameUnqiue(user.getIngameName(), newServer)){
                    user.setServer(newServer);
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Ingame name is not unique on this server");
                }
            }

            String currentIngameName = user.getIngameName();
            String newIngameName = updatedUser.getIngameName();
            if(!currentIngameName.equals(newIngameName)){
                if(isIngameNameUnqiue(newIngameName, user.getServer())){
                    user.setIngameName(newIngameName);
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Ingame name is not unique on this server");
                }
            }

            String newPassword = updatedUser.getPassword();
            if(!newPassword.isBlank()){
                if(isPasswordValid(newPassword)){
                    user.setPassword(passwordEncoder.encode(newPassword));
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Password doesn't meet requirements");
                }
            }
            
            Set<Position> newPositions = updatedUser.getPositions();
            if(!user.getPositions().equals(updatedUser.getPositions())){
                user.setPositions(newPositions);
            }

            userRepository.save(user);
            return user;
            
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find user to update");
    }

    @Override
    public void deleteUser(String username) throws ResponseStatusException{
        log.info("Deleting user {}", username);
        User user = getUser(username);
        user.getFriends().forEach((friend)->{
            friend.getFriends().remove(user);
        });
        user.setFriends(null);
        userRepository.delete(user);
    }

    @Override
    public User getUser(String username) throws ResponseStatusException{
        User user = userRepository.findByUsername(username);
        if(user != null){
            System.out.println(user); // why it doesn't work withotu this print
            return user;
        }
       throw new ResponseStatusException(HttpStatus.NOT_FOUND , "User with username: " + username + "was not found.");
    }

    @Override
    public User getUserById(Long id) throws ResponseStatusException{
        User user = userRepository.findById(id).get();
        if(user != null){
            return user;
        }
       throw new ResponseStatusException(HttpStatus.NOT_FOUND , "User with id: " + id + "was not found.");
    }

    @Override
    public User getUserByIGNandServer(String ingameName, String server) throws ResponseStatusException{
        String upcServer = server.toUpperCase();
        if(!Arrays.stream(Server.values()).anyMatch(s->s.toString().equals(upcServer))){
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE , "This server doesn't exist");
        }
        User user = userRepository.findByIngameNameAndServer(ingameName, Server.valueOf(upcServer));
        if(user != null){
            return user;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND , "User with ingame name: " + ingameName + "and server " + server + "was not found.");

    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public FriendRequest getFriendRequest(Long id){
        return frRepository.findById(id).get();
    }

    @Override
    public User sendFriendRequest(User from, User to) throws ResponseStatusException{
        FriendRequest friendRequest = new FriendRequest();
        if(from != null && to != null){
            if(from.getFriends().contains(to) || to.getFriends().contains(from)){
                throw new ResponseStatusException(HttpStatus.FAILED_DEPENDENCY, "You are already friends with this user");
            }
            friendRequest.setFrom(from);
            friendRequest.setTo(to);
            frRepository.save(friendRequest);
            return from;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This user doesn't exist");
    }

    @Override
    public User acceptFriendRequest(Long id){
        FriendRequest request = frRepository.findById(id).get();
        frRepository.delete(request);
        return startFriendship(request.getFrom(), request.getTo());
    }

    @Override
    public User rejectFriendRequest(Long id){
        FriendRequest request = frRepository.findById(id).get();
        frRepository.delete(request);
        return request.getTo();
    }
        
    private User startFriendship(User friend, User user) throws ResponseStatusException{
        if(friend != null && user != null){
            user.getFriends().add(friend);
            friend.getFriends().add(user);
            userRepository.save(user);
            return user;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @Override
    public User endFriendship(String userName, String friendName) throws ResponseStatusException{
        User user = userRepository.findByUsername(userName);
        User friend = userRepository.findByUsername(friendName);
        if(friend != null && user != null){
            user.getFriends().remove(friend);
            friend.getFriends().remove(user);
            userRepository.save(user);   
            return user; 
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @Override
    public void addRoleToUser(String username, Object role) {
        User user = userRepository.findByUsername(username);
        if(role instanceof String){
            user.getRoles().add(Role.valueOf((String) role));
        }else{
            user.getRoles().add((Role) role);
        }
    }

}
