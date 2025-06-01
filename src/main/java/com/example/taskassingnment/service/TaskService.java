package com.example.taskassingnment.service;

import com.example.taskassingnment.entity.Task;
import com.example.taskassingnment.entity.User;
import com.example.taskassingnment.enums.TaskStatus;
import com.example.taskassingnment.repository.TaskRepository;
import com.example.taskassingnment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TaskService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TaskRepository taskRepository;

    public Task assignTaskToUser(Task taskReq,Long userId){
      User user = userRepository.findById(userId)
              .orElseThrow(()->new RuntimeException("Username not found"));

      taskReq.setStatus(TaskStatus.PENDING);
      taskReq.setUser(user);
     return taskRepository.save(taskReq);
    }

    public List<Task> getTaskOfUser(Long userId){
        return taskRepository.findByUserId(userId);
    }

    public Task updateTaskStatus(Long taskId,TaskStatus status,Long userId){
        Task task = taskRepository.findById(taskId)
                .orElseThrow(()->new RuntimeException("Task not found"));

        if(!task.getUser().getId().equals(userId)){
            throw new RuntimeException("Not an Authorized person");
        }
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public List<Task> getAllTask(){
        return taskRepository.findAll();
    }

    public Task removeTask(Long taskId){
        Task task = taskRepository.findById(taskId).orElseThrow(()->new RuntimeException("task not found"));
        taskRepository.delete(task);
        return task;
    }
}
