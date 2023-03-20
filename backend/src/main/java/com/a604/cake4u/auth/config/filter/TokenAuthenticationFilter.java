package com.a604.cake4u.auth.config.filter;


import com.a604.cake4u.auth.service.AuthToken;
import com.a604.cake4u.auth.service.AuthTokenProvider;
import com.a604.cake4u.auth.util.HeaderUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final AuthTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)  throws ServletException, IOException {

        System.out.println(request.getRequestURI());
        System.out.println(request.get);
        if(request.getRequestURI().equals("/login/ouath2/code/naver")){
            return;
        }
        String tokenStr = HeaderUtil.getAccessToken(request);
        System.out.println("TokenStr: " + tokenStr);
        AuthToken token = tokenProvider.convertAuthToken(tokenStr);

        if (token.validate()) {
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

}