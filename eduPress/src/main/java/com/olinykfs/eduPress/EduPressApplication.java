package com.olinykfs.eduPress;

import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.redis.RedisRepositoriesAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;

@EnableAdminServer
@SpringBootApplication(exclude = { RedisRepositoriesAutoConfiguration.class })
@EnableCaching
public class EduPressApplication {
	public static void main(String[] args) {
		SpringApplication.run(EduPressApplication.class, args);

	}
}