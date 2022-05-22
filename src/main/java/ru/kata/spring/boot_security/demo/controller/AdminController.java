package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;

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
        model.addAttribute("allUsers", userService.findAll());
        model.addAttribute("allRoles", userService.findAllRoles());

        if (!model.containsAttribute("user")) {
            model.addAttribute("user", new User());
        }

        return "all-users";
    }

    @GetMapping("/findOne/{id}")
    public String findOne(@PathVariable("id") Long id, Model model) {
        model.addAttribute("user", userService.findById(id));

        return "fragments/user-update-modal";
    }

    @PostMapping
    public String addUser(@ModelAttribute("user") @Valid User user, BindingResult result) {
        userService.addUser(user);

        return "redirect:/admin";
    }

    @PatchMapping
    public String updateUser(@ModelAttribute("user") @Valid User user) {
        userService.updateUser(user);

        return "redirect:/admin";
    }

    @DeleteMapping
    public String deleteUser(@ModelAttribute("user") User user) {
        userService.deleteById(user.getId());

        return "redirect:/admin";
    }

}