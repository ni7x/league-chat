package de.osiem.leaguechat.auth.service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import de.osiem.leaguechat.auth.model.friendRequest.FriendRequest;
import de.osiem.leaguechat.auth.model.resetPasswordToken.ResetPasswordToken;
import de.osiem.leaguechat.auth.model.user.Position;
import de.osiem.leaguechat.auth.model.user.Role;
import de.osiem.leaguechat.auth.model.user.Server;
import de.osiem.leaguechat.auth.model.user.User;
import de.osiem.leaguechat.auth.repository.FriendRequestRepository;
import de.osiem.leaguechat.auth.repository.ResetPasswordTokenRepository;
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
    private final ResetPasswordTokenRepository rptRepository;

    private final PasswordEncoder passwordEncoder;
    private static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#%&()–[{}]:;',?/*~$^+=<>]).{8,20}$";

    private static boolean isPasswordValid(String password){
        return password.matches(PASSWORD_PATTERN);
    }

    private boolean isUsernameUnique(String username){
        return !userRepository.existsByUsername(username);
    }

    private boolean isEmailUnqiue(String email){
        return !userRepository.existsByEmail(email);
    }

    private boolean isIngameNameUnqiue(String ingameName, Server server){
        return !userRepository.existsByIngameNameAndServer(ingameName, server);
    }

    public void updatePassword(User user, String newPassword){
        if(!newPassword.isBlank()){
            if(isPasswordValid(newPassword)){
                user.setPassword(passwordEncoder.encode(newPassword));
            }else{
                throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Password doesn't meet requirements");
            }
        }
    }
    
    @Override
    public User saveUser(User user) throws ResponseStatusException{

        String username = user.getUsername();
        String ingameName = user.getIngameName();
        String password = user.getPassword();
        Server server = user.getServer();
        String email = user.getEmail();

        if(isUsernameUnique(username)){
            if(isEmailUnqiue(email)){
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
                throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Email is not unique");
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

            String currentEmail = user.getEmail();
            String newEmail = updatedUser.getEmail();
            if(!currentEmail.equals(newEmail)){
                if(isEmailUnqiue(newEmail)){
                    user.setEmail(newEmail);
                }else{                    
                    throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, "Email is not unqiue");
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
            updatePassword(user, newPassword);
            
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
    public User getUserByEmail(String email){
        User user = userRepository.findByEmail(email);
        if(user != null){
            return user;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND , "User with email: " + email + "was not found.");
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
            if(from.equals(to)){
                throw new ResponseStatusException(HttpStatus.FAILED_DEPENDENCY, "You can't send friend request to yourself");
            }
            if(from.getFriends().contains(to)){
                throw new ResponseStatusException(HttpStatus.FAILED_DEPENDENCY, "You are already friends with this user");
            }
            if(from.getFriendRequestsFrom().stream().anyMatch(request->request.getTo().equals(to))){
                throw new ResponseStatusException(HttpStatus.FAILED_DEPENDENCY, "You have already send friend request to this user");
            }
            if(from.getFriendRequestsTo().stream().anyMatch(request->request.getFrom().equals(to))){
                throw new ResponseStatusException(HttpStatus.FAILED_DEPENDENCY, "Check your friend requests");
            }
            friendRequest.setFrom(from);
            friendRequest.setTo(to);
            frRepository.save(friendRequest);
            from.getFriendRequestsFrom().add(friendRequest);
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

    @Override
    public User cancelFriendRequest(Long id){
        FriendRequest request = frRepository.findById(id).get();
        frRepository.delete(request);
        return request.getFrom();
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
    public User endFriendship(User user, User friend) throws ResponseStatusException{
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

    @Override
    public ResetPasswordToken createResetPasswordToken(User user, String token) {
        ResetPasswordToken rptToken = new ResetPasswordToken();
        rptToken.setUser(user);
        rptToken.setToken(token);
        rptRepository.save(rptToken);
        return rptToken;
    }

    @Override
    public ResetPasswordToken getByToken(String token) {
        return rptRepository.findByToken(token);
    }

}
