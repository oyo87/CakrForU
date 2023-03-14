package com.a604.cake4u.inquiry.repository;

import com.a604.cake4u.inquiry.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
}
