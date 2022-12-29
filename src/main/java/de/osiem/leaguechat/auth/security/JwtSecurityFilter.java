package de.osiem.leaguechat.auth.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import de.osiem.leaguechat.auth.security.jwt.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.JwtValidationException;

@RequiredArgsConstructor
@Component
public class JwtSecurityFilter extends OncePerRequestFilter {
    
    private final TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        try{
            Jwt decodedJwt = tokenService.decodeJwt(request);
            UserDetails userDetails =
                        new org.springframework.security.core.userdetails.User(decodedJwt.getSubject(), "",null);
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
                        new UsernamePasswordAuthenticationToken(userDetails,null, null);
				
			SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }catch (JwtValidationException ex) {
		
			String requestURL = request.getRequestURL().toString();
            System.out.println(requestURL);
            System.out.println(); System.out.println();
            System.out.println();
		
			request.setAttribute("exception", ex);

		} catch (BadCredentialsException ex) {
			request.setAttribute("exception", ex);
		} catch (Exception ex) {
			System.out.println(ex);
		}
        
        
        filterChain.doFilter(request, response);
        
    }
    
}
