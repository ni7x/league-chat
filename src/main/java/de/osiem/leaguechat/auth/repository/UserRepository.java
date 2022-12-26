package de.osiem.leaguechat.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.osiem.leaguechat.auth.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByUsername(String username);
    boolean existsByUsername(String username);
}