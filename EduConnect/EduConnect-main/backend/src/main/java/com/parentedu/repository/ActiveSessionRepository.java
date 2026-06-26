package com.parentedu.repository;

import com.parentedu.entity.ActiveSession;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActiveSessionRepository extends JpaRepository<ActiveSession, Long> {
    Optional<ActiveSession> findByToken(String token);
}
