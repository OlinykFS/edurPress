package com.olinykfs.eduPress.services.userServices;

import com.olinykfs.eduPress.customException.GlobalExceptionHandler;
import com.olinykfs.eduPress.details.CustomUserDetails;
import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.repositories.userRepository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws GlobalExceptionHandler.UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new GlobalExceptionHandler.UsernameNotFoundException("User not found");
        }
        return new CustomUserDetails(user);
    }
}
