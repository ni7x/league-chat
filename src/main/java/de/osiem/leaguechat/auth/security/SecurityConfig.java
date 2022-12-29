package de.osiem.leaguechat.auth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
//import de.osiem.leaguechat.auth.security.jwt.JWTAuthenticationConverter;
import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    private final LeagueChatUserDetailsService userDetailsService;
    private final JwtSecurityFilter securityFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .csrf(csfr -> csfr.disable())
                .cors().configurationSource(request -> {
                    CorsConfiguration corsConfig = new CorsConfiguration();
                    corsConfig.addAllowedOriginPattern("*");
                    corsConfig.addAllowedMethod(CorsConfiguration.ALL); 
                    corsConfig.addAllowedHeader("*");
                    return corsConfig;
                })
                .and().authorizeRequests(auth->auth
                    .antMatchers("/api/user/save", "/api/user/forgotPassword", "/api/user/changePassword", "/api/user/validation/**","/api/user/autoSuggestion").permitAll()
                    .antMatchers("/uploads/**", "/api/refresh").permitAll()
                    .antMatchers("/stompOnly/**").permitAll()
                    .antMatchers("/api/users").hasAuthority("ADMIN")
                    .anyRequest().authenticated())
                .oauth2ResourceServer(authorize -> authorize
                    .jwt(/*jwt -> jwt.jwtAuthenticationConverter(new JWTAuthenticationConverter())*/))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider())
                .httpBasic(Customizer.withDefaults())
                .build();
    }

    @Bean
    static PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(encoder());
        return authProvider;
    }
}
