package ru.kata.spring.boot_security.demo.exceptionHandling;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserIncorrectData {
    private String info;
}
