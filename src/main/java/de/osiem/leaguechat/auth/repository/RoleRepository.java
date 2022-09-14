package de.osiem.leaguechat.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.osiem.leaguechat.auth.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
    Role findByName(String name);
}