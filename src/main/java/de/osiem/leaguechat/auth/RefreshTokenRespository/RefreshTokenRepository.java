package de.osiem.leaguechat.auth.RefreshTokenRespository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.osiem.leaguechat.auth.model.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String>{
    public RefreshToken findByToken(String token);
}
