package de.osiem.leaguechat;
import javax.annotation.Resource;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import de.osiem.leaguechat.auth.security.jwt.RSAKeys;
import de.osiem.leaguechat.user.service.FileStorageService;


@SpringBootApplication
@EnableConfigurationProperties(RSAKeys.class)
public class LeagueChatApplication implements CommandLineRunner{   
    @Resource
    FileStorageService storageService; 
    
	public static void main(String[] args) {
		SpringApplication.run(LeagueChatApplication.class, args);
	}

    @Override
    public void run(String... arg) throws Exception {
      storageService.init();
    }

}
