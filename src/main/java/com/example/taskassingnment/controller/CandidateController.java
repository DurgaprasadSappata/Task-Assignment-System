package com.example.taskassingnment.controller;

import com.example.taskassingnment.entity.Task;
import com.example.taskassingnment.entity.User;
import com.example.taskassingnment.enums.TaskStatus;
import com.example.taskassingnment.service.TaskService;
import com.example.taskassingnment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidate")
public class CandidateController {

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getTaskOfUser(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        User user =userService.getUserByEmailOrUsername(name);

        return ResponseEntity.ok(taskService.getTaskOfUser(user.getId()));
    }

    @PutMapping("/tasks/{taskId}/status")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestParam TaskStatus status){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String name = authentication.getName();
        User user =userService.getUserByEmailOrUsername(name);
        Task updatedTask = taskService.updateTaskStatus(taskId,status,user.getId());

        return ResponseEntity.ok(updatedTask);
    }
}
