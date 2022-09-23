package de.osiem.leaguechat.auth.model.user;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import de.osiem.leaguechat.auth.model.friendRequest.FriendRequest;
import lombok.*;

@Entity 
@Data @NoArgsConstructor @AllArgsConstructor
public class User implements UserDetails{

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(min=2, max=16)
    private String ingameName;

    @Size(min=4, max=25)
    @Column(unique = true)
    private String username;
    
    private String password;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();

    @NotNull
    @Enumerated(EnumType.STRING)
    private Server server;

    @OneToMany(mappedBy = "to")
    @JsonIgnoreProperties({"to"})
    private Set<FriendRequest> friendRequestsTo = new HashSet<>();

    @OneToMany(mappedBy = "from")
    @JsonIgnoreProperties("from")
    private Set<FriendRequest> friendRequestsFrom = new HashSet<>();

    @ManyToMany()
    @JsonIgnoreProperties("friends")
    private Set<User> friends = new HashSet<>();

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Position> positions = new HashSet<>();

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
        return Objects.equals(id, user.id) && Objects.equals(ingameName, user.ingameName) && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(roles, user.roles) && Objects.equals(friends, user.friends) && Objects.equals(positions, user.positions);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, ingameName, username, password, roles, positions);
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", ingameName=" + ingameName + ", password=" + password + ", positions=" + positions
                + ", roles=" + roles + ", username=" + username + "]";
    }
    
}
