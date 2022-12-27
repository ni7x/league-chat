package de.osiem.leaguechat.auth.model;



import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {
    @Id
    @Column(length = 64)
    private String id;

    @NotNull
    private String username;

    @NotNull
    private Date expiryDate;

    @NotNull
    @Column(length = 128)
    private String token;
}
