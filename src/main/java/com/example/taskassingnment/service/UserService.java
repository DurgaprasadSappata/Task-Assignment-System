package com.example.taskassingnment.service;

import com.example.taskassingnment.entity.User;
import com.example.taskassingnment.enums.UserRoles;
import com.example.taskassingnment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User getUserByEmailOrUsername(String name){
        return userRepository.findByEmail(name)
                .or(()->userRepository.findByUsername(name))
                .orElseThrow(()->new RuntimeException("user not found with this credentials"));
    }

    public User createUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(UserRoles.CANDIDATE);

        return userRepository.save(user);
    }

    public User createAdmin(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(UserRoles.ADMIN);

        return userRepository.save(user);
    }

    public List<User> findAllUsers(){
        return userRepository.findAll();
    }
}
