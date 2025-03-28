package com.olinykfs.eduPress;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.connection.RedisConnectionFactory;

@SpringBootTest
@ActiveProfiles("test")
class EduPressApplicationTests {

	@MockBean
	private RedisConnectionFactory redisConnectionFactory;

	@Test
	void contextLoads() {
	}
}