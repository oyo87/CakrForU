package com.a604.cake4u.files.repository;

import com.a604.cake4u.files.entity.Files;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilesRepository extends JpaRepository<Files, Long> {
}
