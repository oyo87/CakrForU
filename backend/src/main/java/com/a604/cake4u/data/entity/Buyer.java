package com.a604.cake4u.data.entity;

import com.a604.cake4u.data.entity.auth.ProviderType;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name="buyer")
public class Buyer{
    @Id
    @Column(name="USER_PK")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    @Column(name="username")
    private String username;
    @Column(name="email", unique = true)
    private String email;
    @Column(name="nickname", unique = true)
    private String nickname;
    @Column(name="password", length = 255)
    private String password;
    @Column(name="salt")
    private String salt;
    @Column(name="email_salt")
    private String emailSalt;
    @Column(name="email_verified")
    private byte emailVerified;
    @Column(name="intro")
    private String intro;
    @Column(name="profile_image_url")
    private String profileImageUrl;
    @Column(name="is_ban")
    private byte isBan;
    @Column(name="refresh_token")
    private String refreshToken;

    @Column(name = "provider_type", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ProviderType providerType;

    public Buyer(
            String username,
            String email,
            String nickname,
            byte emailVerified,
            String profileImageUrl,
            byte isBan,
            ProviderType providerType) {
        this.username = username;
        this.email = email;
        this.nickname = nickname;
        this.password = "NO_PASS";
        this.salt = "SALT";
        this.emailSalt = "EMAIL_SALT";
        this.emailVerified = emailVerified;
        this.profileImageUrl = profileImageUrl;
        this.isBan = isBan;
//        this.refreshToken = refreshToken;
        this.providerType = providerType;
    }
}