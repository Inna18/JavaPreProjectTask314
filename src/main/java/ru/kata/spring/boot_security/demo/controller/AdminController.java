package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String showAllUsers() {
        return "all-users";
    }

    @PostMapping
    public String addUser() {
        return "redirect:/admin";
    }

    @PutMapping
    public String updateUser() {
        return "redirect:/admin";
    }

    @GetMapping("/delete")
    public String deleteUser() {
        return "redirect:/admin";
    }

}