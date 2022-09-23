package de.osiem.leaguechat.auth.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import de.osiem.leaguechat.auth.security.jwt.TokenService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class AuthController {

	private final TokenService tokenService;
	
	@PostMapping("/token")
	public ResponseEntity<String> token(Authentication authentication) {
		String token = tokenService.generateToken(authentication);
		return ResponseEntity.ok().body(token);
	}
}