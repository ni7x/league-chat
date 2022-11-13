package de.osiem.leaguechat.auth.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    //need to exlcude user and his friends lord forgive me

    @Query("SELECT u.ingameName FROM User u WHERE u.ingameName LIKE :suggested_ign% AND u.server = :server AND u.ingameName != :current_user_ign  AND :current_user_ign NOT IN (SELECT f.ingameName FROM u.friends f) AND :current_user_ign NOT IN (SELECT b.from.ingameName FROM u.friendRequestsTo b)")
    List<String> findIngameNameSuggestions(@Param("suggested_ign") String suggested_ign, @Param("server") Server server, @Param("current_user_ign") String current_user_ign, Pageable pageable);
    
    default List<String> findFirst5Suggestions(String suggested_ign, Server server, String current_user_ign) {
        return findIngameNameSuggestions(suggested_ign, server, current_user_ign, PageRequest.of(0,5));
     }
}