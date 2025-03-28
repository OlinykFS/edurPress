package com.olinykfs.eduPress.details;

import com.olinykfs.eduPress.entities.user.User;
import com.olinykfs.eduPress.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Data
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    @Getter
    private Long id;
    @Getter
    private String email;
    @Getter
    private String name;
    private String password;
    @Getter
    private Role role;

    private Collection<? extends GrantedAuthority> authorities;
    private boolean emailVerified;
    private String avatarUrl;

    public CustomUserDetails(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getUsername();
        this.password = user.getPassword();
        this.emailVerified = user.isEmailVerified();
        this.role = user.getRole();
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name()));
        this.avatarUrl = user.getAvatarUrl();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

}
