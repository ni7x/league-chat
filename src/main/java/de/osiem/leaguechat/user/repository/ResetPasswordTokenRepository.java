package de.osiem.leaguechat.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import de.osiem.leaguechat.user.model.resetPasswordToken.ResetPasswordToken;

public interface ResetPasswordTokenRepository extends JpaRepository<ResetPasswordToken, Long>{
    ResetPasswordToken findByToken(String token);
}
