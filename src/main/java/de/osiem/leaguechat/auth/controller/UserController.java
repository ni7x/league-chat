package de.osiem.leaguechat.auth.controller;

import java.net.URI;
import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import de.osiem.leaguechat.auth.model.user.User;
import de.osiem.leaguechat.auth.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", exposedHeaders = "If-Match")
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

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

    @PutMapping("/user/username/{username}")
    public ResponseEntity<User> updateUser(@PathVariable String username, Authentication authentication, @Valid @RequestBody User user) throws ResponseStatusException{
        if(authentication.getName().equals(username)){
            userService.updateUser(user);
            return ResponseEntity.ok().body(user);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("/user/id/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Long id, Authentication authentication, @Valid @RequestBody User user) throws ResponseStatusException{
        if(authentication.getName().equals(userService.getUserById(id).getUsername())){
            User updated = userService.updateUser(user);
            return ResponseEntity.ok().body(updated);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
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

@Data
class FriendRequestDto{
    private String fromUsername;
    private String toIngameName;
    private String toServer;
} 
