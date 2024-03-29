package de.osiem.leaguechat.auth.security.jwt;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "rsa")
public record RSAKeys(RSAPublicKey publicKey, RSAPrivateKey privateKey) {

}