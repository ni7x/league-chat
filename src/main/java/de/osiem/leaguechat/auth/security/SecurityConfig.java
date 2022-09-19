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
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

import de.osiem.leaguechat.auth.security.jwt.CustomJwtAuthenticationConverter;
import de.osiem.leaguechat.auth.security.jwt.RsaKeyProperties;



import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final RsaKeyProperties rsaKeys;

    private final LeagueChatUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
                .csrf(csfr -> csfr.disable())
                .cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues())
                .and().authorizeRequests(auth->auth
                    
                    .antMatchers("/api/user/save").permitAll()
                    .antMatchers("/api/users").hasAuthority("MODERATOR")
                    .antMatchers("/api/users").hasAuthority("ADMIN")
                    .antMatchers("/api/user/addRole").hasAuthority("ADMIN")
                    .antMatchers("/").hasAuthority("USER")
                    .anyRequest().authenticated())
                .oauth2ResourceServer(authorize -> authorize
                    .jwt(jwt -> jwt.jwtAuthenticationConverter(new CustomJwtAuthenticationConverter())))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider())
                .httpBasic(Customizer.withDefaults())
                .build();
    }

    @Bean
	JwtDecoder jwtDecoder() {
		return NimbusJwtDecoder.withPublicKey(rsaKeys.publicKey()).build();
	}
	
	@Bean
	JwtEncoder jwtEncoder() {
		JWK jwk = new RSAKey.Builder(rsaKeys.publicKey()).privateKey(rsaKeys.privateKey()).build();
		JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
		return new NimbusJwtEncoder(jwks);
	}

    @Bean
    public static PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(encoder());
        return authProvider;
    }
}
