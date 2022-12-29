package de.osiem.leaguechat.auth.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import de.osiem.leaguechat.auth.security.jwt.TokenService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class JwtLogoutHandler implements LogoutHandler{
    private final TokenService tokenService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
            Jwt decoded = tokenService.decodeJwt(request);
            if(decoded != null){
                String refreshTokenId = decoded.getClaimAsString("refreshTokenId");
                tokenService.logout(refreshTokenId);
            }
    }
    
}
