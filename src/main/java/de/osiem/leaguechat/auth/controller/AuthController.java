package de.osiem.leaguechat.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.osiem.leaguechat.auth.RefreshTokenRespository.RefreshTokenRepository;
import de.osiem.leaguechat.auth.model.RefreshToken;
import de.osiem.leaguechat.auth.security.jwt.TokenService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RequestMapping("api/")
public class AuthController {

	private final TokenService tokenService;
    private final RefreshTokenRepository refreshTokenRepository;
	
	@PostMapping("/tokens")
	public ResponseEntity<Tokens> getTokens(Authentication authentication) {
        RefreshToken refreshToken = tokenService.generateRefreshToken(authentication);
        refreshTokenRepository.save(refreshToken);
		String token = tokenService.generateToken(authentication, refreshToken.getId());
        Tokens tokens = new Tokens(token, refreshToken.getToken());
        System.out.println("Access " + token);
        System.out.println("Refresh " + refreshToken.getToken());
		return ResponseEntity.ok().body(tokens);
	}

    @PostMapping("/refresh")
	public ResponseEntity<String> refreshToken(Authentication authentication, @RequestBody RefreshTokenRequest refreshTokenRequest) {
        String newToken = tokenService.genrateNewAccessToken(authentication, refreshTokenRequest.getRefreshToken());
        System.out.println("Refreshed token " + newToken);
        return ResponseEntity.ok().body(newToken);
	}


}

@Data
@AllArgsConstructor
@NoArgsConstructor
class RefreshTokenRequest{
    private String refreshToken;
}

@Data
@AllArgsConstructor
class Tokens{
    String accessToken;
    String refreshToken;
}