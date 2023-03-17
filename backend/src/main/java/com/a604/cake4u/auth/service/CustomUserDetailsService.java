package com.a604.cake4u.auth.service;


import com.a604.cake4u.auth.entity.UserPrincipal;
import com.a604.cake4u.buyer.entity.Buyer;
import com.a604.cake4u.buyer.repository.BuyerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final BuyerRepository buyerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Buyer buyer = buyerRepository.findByEmail(email);
        if (buyer == null) {
            throw new UsernameNotFoundException("Can not find username.");
        }
        else if("관리자".equals(buyer.getNickname())) {
        	return UserPrincipal.createAdmin(buyer);
        }
        return UserPrincipal.create(buyer);
    }
}