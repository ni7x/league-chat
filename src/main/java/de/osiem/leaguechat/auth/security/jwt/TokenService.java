package de.osiem.leaguechat.auth.security.jwt;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.Random;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import de.osiem.leaguechat.auth.RefreshTokenRespository.RefreshTokenRepository;
import de.osiem.leaguechat.auth.model.RefreshToken;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final RefreshTokenRepository refreshTokenRepository;
	private final JwtEncoder jwtEncoder;
	
	public String generateToken(Authentication authentication, String refreshTokenId) {
		Instant now = Instant.now();
        Set<String> roles = authentication.getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.toSet());

        JwtClaimsSet claims = JwtClaimsSet.builder()
                    .issuer("self")
                    .issuedAt(now)
                    .expiresAt(now.plus(10, ChronoUnit.MINUTES))
                    .subject(authentication.getName())
                    .claim("roles", roles)
                    .claim("refreshTokenId",refreshTokenId)
                    .build();
		return this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}

    public RefreshToken generateRefreshToken(Authentication authentication){
        SecureRandom random = new SecureRandom();
        byte[] r = new byte[64];
        random.nextBytes(r);
        String token = new String(Base64.getEncoder().encode(r));
        Instant now = Instant.now();
        Date expiryDate = Date.from(now.plus(10, ChronoUnit.HOURS));
        String id = UUID.randomUUID().toString();
        return new RefreshToken(id, authentication.getName(), expiryDate, token);
    }

    public String genrateNewAccessToken(Authentication authentication, String refreshTokenStr) {
        System.out.println(refreshTokenStr);
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenStr);
        return generateToken(authentication, refreshToken.getId());
    }

}
