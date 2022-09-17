package de.osiem.leaguechat.auth.controller;


import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import de.osiem.leaguechat.auth.security.jwt.TokenService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RestController
@AllArgsConstructor
@Slf4j
public class AuthController {

	private final TokenService tokenService;
	
	@PostMapping("/token")
	public String token(Authentication authentication) {
		log.info("Token requested for user: {}", authentication.getName());
		String token = tokenService.generateToken(authentication);
		log.info("Token granted {}", token);
		return token;
	}
}