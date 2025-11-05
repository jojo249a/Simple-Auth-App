package com.jojo.test.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jojo.test.models.User;   

@Repository 
public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(String name);
    Optional<User> findByEmail(String email);
}
