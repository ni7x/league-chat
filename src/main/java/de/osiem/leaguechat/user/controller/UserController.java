package de.osiem.leaguechat.user.controller;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import de.osiem.leaguechat.user.model.resetPasswordToken.ResetPasswordToken;
import de.osiem.leaguechat.user.model.user.User;
import de.osiem.leaguechat.user.model.user.UserDto;
import de.osiem.leaguechat.user.service.FileStorageService;
import de.osiem.leaguechat.user.service.MailService;
import de.osiem.leaguechat.user.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", exposedHeaders = "If-Match")
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final MailService mailService;
    private final FileStorageService storageService;

    @GetMapping("/user/current")
	public ResponseEntity<User> getCurrentUser(Authentication authentication) throws ResponseStatusException{
        User user = userService.getUser(authentication.getName());
        return ResponseEntity.ok().body(user);
	}

    @PostMapping("/user/save")
    public ResponseEntity<User> saveUser(@Valid @RequestBody User user) throws ResponseStatusException{
            User newUser = userService.saveUser(user);
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
            return ResponseEntity.created(uri).body(newUser);
    }

    

    @PutMapping("/user/")
    public ResponseEntity<User> updateUser(Authentication authentication, @RequestPart String userString, @RequestPart MultipartFile avatar, @RequestPart String oldAvatar) throws ResponseStatusException{
        try {
            UserDto user = new ObjectMapper().readValue(userString, UserDto.class);
            if(authentication.getName().equals(userService.getUserById(user.getId()).getUsername())){
                User updated = userService.updateUser(user);   
                try {  
                    storageService.save(avatar, updated.getAvatar());
                    if(!oldAvatar.equals("default-avatar.jpg")){
                        storageService.delete(oldAvatar);
                    }
                } catch (Exception e) {
                    System.out.println(e);
                }
                return ResponseEntity.ok().body(updated);
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @DeleteMapping("/user/username/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username, Authentication authentication) throws ResponseStatusException{
        if(authentication.getName().equals(username)){
            userService.deleteUser(username);
            return ResponseEntity.ok().build();
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }


    @PostMapping("/friendRequest")
    public ResponseEntity<User> sendFriendRequest(@RequestBody FriendRequestDto request) throws ResponseStatusException{
        User from = userService.getUser(request.getFromUsername());
        User to = userService.getUserByIGNandServer(request.getToIngameName(), request.getToServer());
        User user = userService.sendFriendRequest(from, to);
        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping("/friendRequest/id/{id}/accept")
    public ResponseEntity<User> acceptFriendRequest(@PathVariable Long id, Authentication authentication) throws ResponseStatusException{
        if(authentication.getName().equals(userService.getFriendRequest(id).getTo().getUsername())){
            User user = userService.acceptFriendRequest(id);
            return ResponseEntity.ok().body(user);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/friendRequest/id/{id}/reject")
    public ResponseEntity<User> rejectFriendRequest(@PathVariable Long id, Authentication authentication) throws ResponseStatusException{
        if(authentication.getName().equals(userService.getFriendRequest(id).getTo().getUsername())){
            User user = userService.rejectFriendRequest(id);
            return ResponseEntity.ok().body(user);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/friendRequest/id/{id}/cancel")
    public ResponseEntity<User> cancelFriendRequest(@PathVariable Long id, Authentication authentication) throws ResponseStatusException{
        if(authentication.getName().equals(userService.getFriendRequest(id).getFrom().getUsername())){
            User user = userService.cancelFriendRequest(id);
            return ResponseEntity.ok().body(user);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/user/endFriendship")
    public ResponseEntity<User> endFriendship(@RequestBody FriendRequestDto request) throws ResponseStatusException{
        User from = userService.getUser(request.getFromUsername());
        User to = userService.getUserByIGNandServer(request.getToIngameName(), request.getToServer());
        User user = userService.endFriendship(from, to);
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/user/username/{username}")
    public ResponseEntity<User> getByUsername(@PathVariable String username) throws ResponseStatusException{
        return ResponseEntity.ok().body(userService.getUser(username));
    }
    
    @GetMapping("/user/name/{ingameName}/server/{server}")
    public ResponseEntity<User> getByIngameNameAndServer(@PathVariable String ingameName, @PathVariable String server) throws ResponseStatusException{
        return ResponseEntity.ok().body(userService.getUserByIGNandServer(ingameName, server));
    }

    @PostMapping("/user/addRole")
    public ResponseEntity<?> addRole(@RequestBody RoleToUser form){
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/user/forgotPassword")
    public ResponseEntity<String> forgotPassword(@RequestBody String userEmail){
        User user = userService.getUserByEmail(userEmail);
        String token = UUID.randomUUID().toString();
        userService.createResetPasswordToken(user, token);
        mailService.sendMail(userEmail, "Reset Password", "http://localhost:3000" + "/forgotPassword?token=" + token);
        return ResponseEntity.ok().body("Email sent");
    }

    @PostMapping("/user/changePassword")
    public ResponseEntity<User> changePassword(@RequestBody PasswordToken passwordToken){
        ResetPasswordToken rpt = userService.getByToken(passwordToken.getToken());
        System.out.println(rpt);
        if(rpt != null){
            if(LocalDateTime.now().isBefore(rpt.getExpirationTime())){
                User user = rpt.getUser();
                userService.updatePassword(user, passwordToken.getPassword());
                return ResponseEntity.ok().body(user);
            }else{
                throw new ResponseStatusException(HttpStatus.GONE);
            }
           
        }else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/user/autoSuggestion")
    public List<String> getIngameNameSuggestions(@RequestBody AutoSuggestion autoSuggestion){
        return userService.getIngameNameSuggestions(autoSuggestion.getSuggested_ign(), autoSuggestion.getServer(), autoSuggestion.getCurrent_user_ign());
    }

    @PostMapping("/user/validation/username")
    public Boolean isUsernameUnique(@RequestBody String username){
        System.out.println(username);
        return userService.getUser(username) == null;
    }

    @PostMapping("/user/validation/ingamename")
    public Boolean isIngameNameUnique(@RequestBody UserDto serverIgn){
        return userService.getUserByIGNandServer(serverIgn.getIngameName(), serverIgn.getServer()) == null;
    }

    @PostMapping("/user/validation/email")
    public Boolean isEmailUnique(@RequestBody String email){
        return userService.getUserByEmail(email) == null;
    }

    

}

@Data
class UserDtoAndAvatar{
    private UserDto userDto;
    private MultipartFile avatar;
}


@Data
class RoleToUser{
    private String username;
    private String roleName;
} 


@Data
class FriendToUser{
    private String username;
    private String friendName;
} 

@Data
class FriendRequestDto{
    private String fromUsername;
    private String toIngameName;
    private String toServer;
} 

@Data
class PasswordToken{
    private String password;
    private String token;
} 

@Data
class AutoSuggestion{
    private String current_user_ign;
    private String suggested_ign;
    private String server;
} 
