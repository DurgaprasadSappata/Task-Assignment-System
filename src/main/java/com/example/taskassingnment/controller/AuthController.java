package com.example.taskassingnment.controller;

import com.example.taskassingnment.entity.User;
import com.example.taskassingnment.service.TaskService;
import com.example.taskassingnment.service.UserDetailServiceImpl;
import com.example.taskassingnment.service.UserService;
import com.example.taskassingnment.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @PostMapping("/signup")
    public ResponseEntity<User> signupUser(@RequestBody User user){
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PostMapping("/signup/admin")
    public ResponseEntity<User> signupAdmin(@RequestBody User user){
        return ResponseEntity.ok(userService.createAdmin(user));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user){
       try{ authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword())
        );
        UserDetails userDetails = userDetailService.loadUserByUsername(user.getUsername());
        String jwtToken = jwtUtil.generateToken(userDetails);

//        String role = userDetails.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .findFirst()
//                .orElse("ROLE_USER");
//
//        // Create response map
//        Map<String, Object> response = new HashMap<>();
//        response.put("token", jwtToken);
//        response.put("role", role);
//        // Send the response
        return ResponseEntity.ok(jwtToken);
       }
       catch (Exception e){
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
       }

    }

}
