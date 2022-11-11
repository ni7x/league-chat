package de.osiem.leaguechat.auth.model.resetPasswordToken;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import de.osiem.leaguechat.auth.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class ResetPasswordToken {
    private static final int EXPIRATION = 5;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne()
    @NotNull()
    private User user;

    private String token;

    LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(EXPIRATION);
}
