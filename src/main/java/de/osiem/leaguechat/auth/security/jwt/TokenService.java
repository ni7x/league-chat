package de.osiem.leaguechat.auth.security.jwt;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import de.osiem.leaguechat.auth.RefreshTokenRespository.RefreshTokenRepository;
import de.osiem.leaguechat.auth.model.RefreshToken;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final RefreshTokenRepository refreshTokenRepository;
	private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;
	
	public String generateToken(String username, String refreshTokenId) {
		Instant now = Instant.now();
       /*Set<String> roles = authentication.getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.toSet());*/

       

        JwtClaimsSet claims = JwtClaimsSet.builder()
                    .issuer("self")
                    .issuedAt(now)
                    .expiresAt(now.plus(1, ChronoUnit.SECONDS))
                    .subject(username)
                    //.claim("roles", roles)
                    .claim("refreshTokenId",refreshTokenId)
                    .build();
		return this.jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}

    public RefreshToken generateRefreshToken(String username){
        SecureRandom random = new SecureRandom();
        byte[] r = new byte[64];
        random.nextBytes(r);
        String token = new String(Base64.getEncoder().encode(r));
        Instant now = Instant.now();
        LocalDateTime expiryDate = LocalDateTime.ofInstant(now.plus(10, ChronoUnit.HOURS), ZoneId.of("CET"));
        String id = UUID.randomUUID().toString();
        return new RefreshToken(id, username, expiryDate, token);
    }

    public String genrateNewAccessToken(String refreshTokenStr) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenStr);
        if(refreshToken != null){
            return generateToken(refreshToken.getUsername(), refreshToken.getId());
        }
        return null;     
    }

    public Jwt decodeJwt(HttpServletRequest request){
        String jwt = parseJwt(request);
        System.out.println(jwt);
        if(jwt != null){
            return jwtDecoder.decode(jwt);
        }
        return null;
    }

    private String parseJwt(HttpServletRequest request){
        System.out.println(request.getRequestURI());
        String headerAuth = request.getHeader("Authorization");
        System.out.println("HEader " + headerAuth);
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7, headerAuth.length());
        }
        return null;
    }

    public void logout (String refreshTokenId){
        refreshTokenRepository.deleteById(refreshTokenId);
    }

    



}
