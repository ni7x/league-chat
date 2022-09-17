package de.osiem.leaguechat.auth.model;

import java.util.*;
import javax.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.*;

@Entity 
@Data @NoArgsConstructor @AllArgsConstructor
public class User implements UserDetails{

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //add validation
    private String ingameName;
    private String username;
    private String password;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();

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
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    
}
