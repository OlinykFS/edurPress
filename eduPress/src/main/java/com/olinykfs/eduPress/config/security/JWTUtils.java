package com.olinykfs.eduPress.config.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JWTUtils {

    private final Key signingKey;

    private static final long ACCESS_TOKEN_VALIDITY = 1000 * 60 * 60 * 24;
    private static final long REFRESH_TOKEN_VALIDITY = 1000 * 60 * 60 * 24 * 7;

    public JWTUtils(@Value("${jwt.secret}") String secretKey) {
        log.info("Loaded JWT Secret: {}", secretKey);
        this.signingKey = Keys.hmacShaKeyFor(secretKey.getBytes());
    }


    public Optional<String> extractUsername(String token) {
        try {
            return Optional.ofNullable(extractClaim(token, Claims::getSubject));
        } catch (ExpiredJwtException e) {
            log.error("JWT expired: {}", e.getMessage());

            return Optional.empty();
        } catch (Exception e) {
            log.error("Error extracting username from token: {}", e.getMessage());
            return Optional.empty();
        }
    }


    public Long extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("userId", Long.class);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setAllowedClockSkewSeconds(60)
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token)
                .orElseThrow(() -> new JwtException("Invalid token"));
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    public String generateToken(UserDetails userDetails, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", extractRoles(userDetails));
        claims.put("userId", userId);
        return createToken(claims, userDetails.getUsername(), ACCESS_TOKEN_VALIDITY);
    }

    public String generateRefreshToken(UserDetails userDetails, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", extractRoles(userDetails));
        claims.put("userId", userId);
        return createToken(claims, userDetails.getUsername(), REFRESH_TOKEN_VALIDITY);
    }

    private List<String> extractRoles(UserDetails userDetails) {
        return userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }

    private String createToken(Map<String, Object> claims, String subject, long validity) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + validity))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }
}
