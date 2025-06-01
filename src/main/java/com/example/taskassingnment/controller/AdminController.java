package com.example.taskassingnment.controller;

import com.example.taskassingnment.entity.Task;
import com.example.taskassingnment.entity.User;
import com.example.taskassingnment.repository.TaskRepository;
import com.example.taskassingnment.service.TaskService;
import com.example.taskassingnment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    @PostMapping("/assign/{userId}")
    public ResponseEntity<Task> assignTask(@RequestBody Task task, @PathVariable Long userId){
      Task newtask = taskService.assignTaskToUser(task,userId);
      return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @GetMapping("/tasks/{userId}")
    public ResponseEntity<List<Task>> getTasksOfUsers(@PathVariable Long userId){
        return ResponseEntity.ok(taskService.getTaskOfUser(userId));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        System.out.println("Getting Users :|||||||||||||||");
        return ResponseEntity.of(Optional.ofNullable(userService.findAllUsers()));
    }

    @DeleteMapping("tasks/{taskId}")
    public ResponseEntity<Task> deleteTask(@PathVariable Long taskId){
      Task removed = taskService.removeTask(taskId);
      return ResponseEntity.ok(removed);
    }

}
