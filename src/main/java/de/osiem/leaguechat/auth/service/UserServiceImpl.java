package de.osiem.leaguechat.auth.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import de.osiem.leaguechat.auth.model.Position;
import de.osiem.leaguechat.auth.model.Role;
import de.osiem.leaguechat.auth.model.User;
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
    public User saveUser(User user){
        log.info("Saving user " + user);
        if(getUser(user.getUsername()) == null){
            String password = user.getPassword();
            if(passwordIsValid(password)){    
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                user.getRoles().add(Role.USER);
                userRepository.save(user);
                return user;
            }else{
                log.error("Password doesn't match the pattern");
                return null;
            }    
        }
       log.error("This username is already taken!");
       return null;
    }

    @Override
    public User updateUser(User updatedUserData){
        Optional<User> user = userRepository.findById(updatedUserData.getId());
        System.out.println(updatedUserData);
        if(user.isPresent()){
            User updatedUser = user.get();
            updatedUser.setIngameName(updatedUserData.getIngameName());
            updatedUser.setUsername(updatedUserData.getUsername());
            if(passwordIsValid(updatedUserData.getPassword())){
                updatedUser.setPassword(passwordEncoder.encode(updatedUserData.getPassword()));
            }
            updatedUser.setPositions(updatedUserData.getPositions());
            userRepository.save(updatedUser);

        }
       return null;
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
