package de.osiem.leaguechat.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import de.osiem.leaguechat.auth.model.user.Server;
import de.osiem.leaguechat.auth.model.user.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByUsername(String username);
    User findByEmail(String email);
    boolean existsByUsername(String username);
    User findByIngameNameAndServer(String ingameName, Server server);
    boolean existsByIngameNameAndServer(String ingameName, Server server);
    boolean existsByEmail(String email);
    @Query("SELECT u.ingameName FROM User u WHERE u.ingameName LIKE :ingameName% AND u.server = :server")
    List<String> findIngameNameSuggestions(@Param("ingameName") String ingameName, @Param("server") Server server);
}