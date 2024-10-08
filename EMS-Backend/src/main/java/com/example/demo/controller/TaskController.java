package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.TaskRequest;
import com.example.demo.dto.TaskStatusUpdateRequest;
import com.example.demo.entity.Employee;
import com.example.demo.entity.Task;
import com.example.demo.service.EmployeeService;
import com.example.demo.service.TaskService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;
    
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/assign")
    public ResponseEntity<Task> assignTask(@RequestBody TaskRequest tr) throws MessagingException{
    	Task task = new Task();
    	task.setTaskName(tr.getTaskName());
    	task.setDescription(tr.getDescription());
    	task.setStartDate(tr.getStartDate());
    	task.setDueDate(tr.getDueDate());
    	task.setAssignedBy(employeeService.getEmployeeInfo(tr.getAssignedBy()));
    	task.setAssignedTo(employeeService.getEmployeeInfo(tr.getAssignedTo()));
    	task.setStatus(tr.getStatus());
        Task assignedTask = taskService.assignTask(task);
        return new ResponseEntity<>(assignedTask, HttpStatus.CREATED);	
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeTask(@PathVariable int id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>("Task removed successfully", HttpStatus.OK);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Task>> getTasksByEmployee(@PathVariable int employeeId) {
        List<Task> tasks = taskService.getTasksByEmployee(employeeId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    
    @PutMapping("/{taskId}")
    public ResponseEntity<?> updateTaskStatus(@PathVariable int taskId, @RequestBody TaskStatusUpdateRequest request) {
        try {
            Task updatedTask = taskService.updateTaskStatus(taskId, request.getStatus());
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update task status: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}