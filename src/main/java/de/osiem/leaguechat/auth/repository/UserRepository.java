package de.osiem.leaguechat.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.osiem.leaguechat.auth.model.user.Server;
import de.osiem.leaguechat.auth.model.user.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByUsername(String username);
    User findByEmail(String email);
    boolean existsByUsername(String username);
    User findByIngameNameAndServer(String ingameName, Server server);
    boolean existsByIngameNameAndServer(String ingameName, Server server);
    boolean existsByEmail(String email);
}