package de.osiem.leaguechat.auth.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import de.osiem.leaguechat.auth.model.User;
import de.osiem.leaguechat.auth.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", exposedHeaders = "If-Match")
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    @GetMapping("/user/me")
	public ResponseEntity<User> getMe(Authentication authentication) {
        System.out.println("AUTH " + authentication);
	    return ResponseEntity.ok().body(userService.getUser(authentication.getName()));
	}

    @PostMapping("/user/save")
    public ResponseEntity<User> saveUser(@Valid @RequestBody User user){
        User newUser = userService.saveUser(user);
        if(newUser != null){
            URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
            return ResponseEntity.created(uri).body(newUser);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/user/username/{username}")
    public ResponseEntity<User> updateUser(@PathVariable String username, Authentication authentication, @Valid @RequestBody User user){
        if(authentication.getName().equals(username)){
            userService.updateUser(user);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
      
    }

    @DeleteMapping("/user/username/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username, Authentication authentication){
        if(authentication.getName().equals(username)){
            userService.deleteUser(username);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
      
    }

    @PostMapping("/user/addPosition")
    public ResponseEntity<?> addPosition(@RequestBody PositionToUser form){
        userService.addPositionToUser(form.getUsername(), form.getPositionName());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/user/addFriend")
    public ResponseEntity<User> addFriend(@RequestBody FriendToUser form){
        User user = userService.addFriendToUser(form.getUsername(), form.getFriendName());
        if(user!=null){
            return ResponseEntity.ok().body(user);
        }
        return ResponseEntity.badRequest().build();
        
    }
    @PostMapping("/user/removeFriend")
    public ResponseEntity<User> removeFriend(@RequestBody FriendToUser form){
        User user = userService.removeFriendFromUser(form.getUsername(), form.getFriendName());
        if(user!=null){
            return ResponseEntity.ok().body(user);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @GetMapping("/user/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username){
        return ResponseEntity.ok().body(userService.getUser(username));
    }

    @PostMapping("/user/addRole")
    public ResponseEntity<?> addRole(@RequestBody RoleToUser form){
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }
	
}



@Data
class RoleToUser{
    private String username;
    private String roleName;
} 

@Data
class PositionToUser{
    private String username;
    private String positionName;
} 

@Data
class FriendToUser{
    private String username;
    private String friendName;
} 
