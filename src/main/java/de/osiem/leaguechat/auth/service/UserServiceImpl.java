package de.osiem.leaguechat.auth.service;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import de.osiem.leaguechat.auth.model.friendRequest.FriendRequest;
import de.osiem.leaguechat.auth.model.user.Position;
import de.osiem.leaguechat.auth.model.user.Role;
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

    private static final String PASSWORD_PATTERN =
            "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$";

    private static boolean passwordIsValid(String password){
        if(password.matches(PASSWORD_PATTERN)){
            return true;
        }
        return false;
    }

    @Override
    public User saveUser(User user) throws ResponseStatusException{
        log.info("Saving user " + user);
        if(!userRepository.existsByUsername(user.getUsername())){
            if(!userRepository.existsByIngameNameAndServer(user.getIngameName(), user.getServer())){
                String password = user.getPassword();
                if(passwordIsValid(password)){    
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                    user.getRoles().add(Role.USER);
                    user.getPositions().add(Position.FILL);
                    userRepository.save(user);
                    return user;
                }else{
                    log.error("Password doesn't match the pattern");
                    
                }    
            }else{
                log.error("Given ingame name in given server is already taken");
            }
            
        }
       log.error("This username is already taken!");
       throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Couldn't find user to update");

    }

    @Override
    public User updateUser(User updatedUserData) throws ResponseStatusException{
        Optional<User> user = userRepository.findById(updatedUserData.getId());
        if(user.isPresent()){
            User updatedUser = user.get();
            if(!updatedUserData.getIngameName().equals(updatedUser.getIngameName()) || !updatedUserData.getServer().equals(updatedUser.getServer())){
                if(!userRepository.existsByIngameNameAndServer(updatedUserData.getIngameName(), updatedUserData.getServer())){
                    updatedUser.setIngameName(updatedUserData.getIngameName());
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "This ingame name on this given sever is already taken");
                }
            }
            if(!updatedUserData.getUsername().equals(updatedUser.getUsername())){
                if(!userRepository.existsByUsername(updatedUserData.getUsername())){
                    updatedUser.setUsername(updatedUserData.getUsername());
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "This username is already taken");
                }
            }
            if(!updatedUserData.getPassword().isBlank()){
                if(passwordIsValid(updatedUserData.getPassword())){
                    updatedUser.setPassword(passwordEncoder.encode(updatedUserData.getPassword()));
                }else{
                    throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "This password didn't meet requirments");
                }
            }
            
            updatedUser.setPositions(updatedUserData.getPositions());
            updatedUser.setServer(updatedUserData.getServer());
            userRepository.save(updatedUser);
            return updatedUser;
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
        System.out.println(user); // why it doesn't work withotu this print
        if(user != null){
            return user;
        }
       throw new ResponseStatusException(HttpStatus.NOT_FOUND , "User with username: " + username + "was not found.");
    }

    @Override
    public List<User> getUsers() {
        log.info("Getting all users");
        return userRepository.findAll();
    }

    @Override
    public FriendRequest getFriendRequest(Long id){
        return frRepository.findById(id).get();
    }

    @Override
    public User acceptFriendRequest(Long id){
        FriendRequest request = frRepository.findById(id).get();
        frRepository.delete(request);
        return addFriend(request.getFrom(), request.getTo());
    }

    @Override
    public User rejectFriendRequest(Long id){
        FriendRequest request = frRepository.findById(id).get();
        frRepository.delete(request);
        return request.getTo();
    }

    @Override
    public void sendFriendRequest(String from, String to){
        FriendRequest friendRequest = new FriendRequest();
        User userFrom = userRepository.findByUsername(from);
        User userTo = userRepository.findByUsername(to);
        if(userFrom != null && userTo != null){
            friendRequest.setFrom(userFrom);
            friendRequest.setTo(userTo);
            frRepository.save(friendRequest);
        }
      
    }

    
    public User addFriend(User friend, User user){
        if(friend != null && user != null){
            user.getFriends().add(friend);
            friend.getFriends().add(user);
            userRepository.save(user);
            return user;
        }
        log.error("can't add user to frindlst");
        return null;
    }

    @Override
    public User removeFriend(String userName, String friendName) {
        User user = userRepository.findByUsername(userName);
        User friend = userRepository.findByUsername(friendName);
        if(friend != null && user != null){
            log.info("Removing friend {} from friendlist of user {}", friendName, userName);
            user.getFriends().remove(friend);
            friend.getFriends().remove(user);
            userRepository.save(user);   
            return user; 
        }
        return null;  
    }

    @Override
    public void addRoleToUser(String username, Object role) {
        User user = userRepository.findByUsername(username);
        if(role instanceof String){
            user.getRoles().add(Role.valueOf((String) role));
        }else{
            user.getRoles().add((Role) role);
        }
        log.info("Adding role " + role + "to user: " + username);
    }

}
