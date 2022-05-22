package ru.kata.spring.boot_security.demo.service;

import org.springframework.validation.BindingResult;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    User findById(Long id);

    List<User> findAll();

    boolean addUser(User user);

    boolean updateUser(User user);

    boolean deleteById(Long id);

    Iterable<Role> findAllRoles();
}
