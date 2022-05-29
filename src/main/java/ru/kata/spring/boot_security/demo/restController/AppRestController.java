package ru.kata.spring.boot_security.demo.restController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
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
        List<User> users = userService.findAll();

        return users;
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        User user = userService.findById(id);

        if (user == null) {
            throw new NoSuchUserException("There is no User with ID - " + id + " in DB");
        }

        return user;
    }

    @GetMapping("/user")
    public User getUserByEmail(Principal principal) {
        User user = userService.findByEmail(principal.getName());

        return user;
    }

    @PostMapping("/users")
    public User addNewUser(@Valid @RequestBody User user, BindingResult result) {
        try {
            userService.saveUser(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@Valid @RequestBody User user) {
        userService.saveUser(user);

        return user;
    }


    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        boolean result = userService.deleteById(id);

        if (result == false) {
            throw new NoSuchUserException("There is no User with ID - " + id + " in DB");
        }

        return "User with ID - " + id + " was deleted successfully";
    }

}
