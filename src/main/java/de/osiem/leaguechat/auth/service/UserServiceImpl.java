package de.osiem.leaguechat.auth.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import de.osiem.leaguechat.auth.model.user.Position;
import de.osiem.leaguechat.auth.model.user.Role;
import de.osiem.leaguechat.auth.model.user.Server;
import de.osiem.leaguechat.auth.model.user.User;
import de.osiem.leaguechat.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional // don't have to use save when modyfing user
@RequiredArgsConstructor // instead of making autowired constructors and injecting repositores
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
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
    public User saveUser(User user) throws Exception{
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
                    throw new Exception("PasswordException");
                }    
            }else{
                log.error("Given ingame name in given server is already taken");
                throw new Exception("IngameNameException");
            }
            
        }
       log.error("This username is already taken!");
       throw new Exception("UsernameException");
    }

    @Override
    public User updateUser(User updatedUserData) throws Exception{
        Optional<User> user = userRepository.findById(updatedUserData.getId());
        if(user.isPresent()){
            User updatedUser = user.get();
            if(!updatedUserData.getIngameName().equals(updatedUser.getIngameName()) || !updatedUserData.getServer().equals(updatedUser.getServer())){
                if(!userRepository.existsByIngameNameAndServer(updatedUserData.getIngameName(), updatedUserData.getServer())){
                    updatedUser.setIngameName(updatedUserData.getIngameName());
                }else{
                    throw new Exception("IngameNameException");
                }
            }
            if(!updatedUserData.getUsername().equals(updatedUser.getUsername())){
                if(!userRepository.existsByUsername(updatedUserData.getUsername())){
                    updatedUser.setUsername(updatedUserData.getUsername());
                }else{
                    throw new Exception("UsernameException");
                }
            }
            if(!updatedUserData.getPassword().isBlank()){
                if(passwordIsValid(updatedUserData.getPassword())){
                    updatedUser.setPassword(passwordEncoder.encode(updatedUserData.getPassword()));
                }else{
                    throw new Exception("PasswordException");
                }
            }
            
            updatedUser.setPositions(updatedUserData.getPositions());
            updatedUser.setServer(updatedUserData.getServer());
            userRepository.save(updatedUser);
            return updatedUser;
        }
      throw new Exception("NoSuchUserException");
    }

    @Override
    public void deleteUser(String username){
        log.info("Deleting user {}", username);
        User user = getUser(username);
        user.getFriends().forEach((friend)->{
            friend.getFriends().remove(user);
        });
        user.setFriends(null);
        userRepository.delete(user);
    }

    @Override
    public User getUser(String username) {
        log.info("Getting user " + username);
        User user = userRepository.findByUsername(username);
        System.out.println(user);
        return user;
    }

    @Override
    public List<User> getUsers() {
        log.info("Getting all users");
        return userRepository.findAll();
    }

    @Override
    public User addFriendToUser(String userName, String friendName){
        User user = userRepository.findByUsername(userName);
        User friend = userRepository.findByUsername(friendName);
        if(friend != null && user != null){
            log.info("Adding friend {} to friendlist of user {}", friendName, userName);
            user.getFriends().add(friend);
            friend.getFriends().add(user);
            userRepository.save(user);
            return user;
        }
        return null;
    }

    @Override
    public User removeFriendFromUser(String userName, String friendName) {
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

    @Override
    public void addPositionToUser(String username, Object position) {
        User user = userRepository.findByUsername(username);
        if(position instanceof String){
            user.getPositions().add(Position.valueOf((String) position));
        }else{
            user.getPositions().add((Position) position);
        }
        log.info("Adding position " + position + "to user: " + username);
    }
    
}
