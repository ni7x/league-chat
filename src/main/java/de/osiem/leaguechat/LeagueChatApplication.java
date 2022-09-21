package de.osiem.leaguechat;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import de.osiem.leaguechat.auth.security.jwt.RsaKeyProperties;


@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
public class LeagueChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeagueChatApplication.class, args);
	}

}
