package de.osiem.leaguechat.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import de.osiem.leaguechat.auth.model.resetPasswordToken.ResetPasswordToken;

public interface ResetPasswordTokenRepository extends JpaRepository<ResetPasswordToken, Long>{
    
}
