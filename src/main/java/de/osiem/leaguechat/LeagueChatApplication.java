package de.osiem.leaguechat;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class LeagueChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeagueChatApplication.class, args);
	}

    /*@Bean
    CommandLineRunner run(UserService userService){
        return args -> {
            userService.saveRole(new Role(null, "ROLE_USER"));
            userService.saveRole(new Role(null, "ROLE_MANAGER"));
            userService.saveRole(new Role(null, "ROLE_ADMIN"));
            userService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

            userService.createUser(new User(null, "SorryMyBard", "adi123", "jebacstunera", new ArrayList<>()));
            userService.createUser(new User(null, "TG TGGT TG TGGT", "7022707", "sznicel", new ArrayList<>()));
            userService.createUser(new User(null, "Mangos", "username1", "password1", new ArrayList<>()));
            userService.createUser(new User(null, "MangosV2", "username2", "password1", new ArrayList<>()));

            userService.addRoleToUser("username1", "ROLE_USER");
            userService.addRoleToUser("username2", "ROLE_MANAGER");
            userService.addRoleToUser("adi123", "ROLE_ADMIN");
            userService.addRoleToUser("adi123", "ROLE_MANAGER");
            userService.addRoleToUser("7022707", "ROLE_SUPER_ADMIN");
            userService.addRoleToUser("7022707", "ROLE_ADMIN");
            userService.addRoleToUser("7022707", "ROLE_MANAGER");
        };
    }*/
}
