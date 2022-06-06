package ru.kata.spring.boot_security.demo.dao;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserDao extends JpaRepository<User, Long> {
    @EntityGraph(attributePaths = {"roles"})
    Optional<User> findById(Long id);

    @EntityGraph(attributePaths = {"roles"})
    User findByEmail(String email);

    @EntityGraph(attributePaths = {"roles"})
    List<User> findAllByOrderByIdAsc();

    @EntityGraph(attributePaths = {"roles"})
    void deleteById(Long id);
}
