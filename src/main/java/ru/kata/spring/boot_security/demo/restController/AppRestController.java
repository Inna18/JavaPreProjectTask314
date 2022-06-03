package ru.kata.spring.boot_security.demo.restController;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import ru.kata.spring.boot_security.demo.exceptionHandling.NoSuchUserException;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AppRestController {

    private final UserService userService;

    @Autowired
    public AppRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> showAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping("/user")
    public User getUserByEmail(Principal principal) {
        return userService.findByEmail(principal.getName());
    }

    @PostMapping("/users")
    public User addNewUser(@Valid @RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@Valid @RequestBody User user) {
        userService.saveUser(user);
        return user;
    }


    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        try {
            userService.deleteById(id);
        } catch (NoSuchUserException e) {
            e.getStackTrace();
        }
        return "User with ID - " + id + " was deleted successfully";
    }
}
