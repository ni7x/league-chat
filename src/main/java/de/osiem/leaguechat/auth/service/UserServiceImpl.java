package de.osiem.leaguechat.auth.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import de.osiem.leaguechat.auth.model.Role;
import de.osiem.leaguechat.auth.model.User;
import de.osiem.leaguechat.auth.repository.RoleRepository;
import de.osiem.leaguechat.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional // don't have to use save when modyfing user
@RequiredArgsConstructor // instead of making autowired constructors and injecting repositores
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public User saveUser(User user) {
        log.info("Saving new user " + user.getUsername());
        return userRepository.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role " + role.getName());
        return roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role " + roleName + "to user: " + username);
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);

    }

    @Override
    public User getUser(String username) {
        log.info("Getting user " + username);
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        log.info("Getting all users");
        return userRepository.findAll();
    }
    
}
