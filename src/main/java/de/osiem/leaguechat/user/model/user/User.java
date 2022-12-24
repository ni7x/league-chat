package de.osiem.leaguechat.user.model.user;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import de.osiem.leaguechat.conversations.model.Conversation;
import de.osiem.leaguechat.user.model.friendRequest.FriendRequest;
import lombok.*;

@Entity 
@Data @NoArgsConstructor @AllArgsConstructor
public class User implements UserDetails{
    //Add blocklist later
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(min=2, max=16)
    private String ingameName;

    @Size(min=4, max=25)
    @Column(unique = true)
    private String username;

    private String password;

    @Email(regexp = "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")
    @Column(unique = true)
    private String email;

    @Column(length = 64)
    private String avatar = "default-avatar.jpg";

    @ElementCollection
    @Fetch(FetchMode.JOIN)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Server server;

    @OneToMany(mappedBy="to", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"to"})
    private Set<FriendRequest> friendRequestsTo = new HashSet<>();

    @OneToMany(mappedBy="from", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("from")
    private Set<FriendRequest> friendRequestsFrom = new HashSet<>();

    @ManyToMany()
    @JsonIgnoreProperties("friends")
    private Set<User> friends = new HashSet<>();

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Position> positions = new HashSet<>();

    @ManyToMany()
    private Set<Conversation> conversations;

    public void deleteFriends(){
        friends.forEach(friend -> friend.getFriends().remove(this));
        setFriends(null);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new HashSet<>();
        roles.forEach(role -> {
            SimpleGrantedAuthority rAuthority = new SimpleGrantedAuthority(role.name());
            authorities.add(rAuthority);
        });
        return authorities;
    }
    

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(username, user.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, ingameName, username, server, email);
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", ingameName=" + ingameName + ", password=" + password + ", positions=" + positions
                + ", roles=" + roles + ", username=" + username + "]" + ", server=" + server + "]" + ", email=" + email + "]";
    }
    
}
