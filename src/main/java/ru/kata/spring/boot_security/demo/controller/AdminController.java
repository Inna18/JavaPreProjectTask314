package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String showAllUsers(Model model) {
        List<User> allUsers = userService.findAll();
        model.addAttribute("allUsers", allUsers);

        return "all-users";
    }

    @GetMapping("/addNewUser")
    public String addNewUser(Model model) {
        User user = new User();
        model.addAttribute("user", user);

        return "save-user";
    }

    @PostMapping("/saveUser")
    public String saveUser(@ModelAttribute("user") @Valid User user, BindingResult result) {
        if (result.hasErrors()) {
            return "save-user";
        }

        try {
            userService.saveUser(user);
        } catch (Exception e) {
            result.rejectValue("email", "user.email","Account with this username/email already exists.");
            return "save-user";
        }

        return "redirect:/admin";
    }

    @GetMapping("/updateUser/{id}")
    public String updateUser(@PathVariable(value = "id") Long id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);

        return "update-user";
    }

    @GetMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable(value = "id") Long id) {
        userService.deleteById(id);

        return "redirect:/admin";
    }

}
