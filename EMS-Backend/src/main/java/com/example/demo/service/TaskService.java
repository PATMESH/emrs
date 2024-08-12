package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Performance;
import com.example.demo.entity.Task;
import com.example.demo.repo.EmployeeRepository;
import com.example.demo.repo.PerformanceRepository;
import com.example.demo.repo.TaskRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PerformanceRepository performanceRepository;

    public Task assignTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(int id) {
        Task task = taskRepository.findById(id).orElse(null);
        taskRepository.delete(task);
    }

    public List<Task> getTasksByEmployee(int employeeId) {
    	Employee e = employeeRepository.findById(employeeId).orElse(null);
        return taskRepository.findByAssignedTo(e);
    }

    public void markTaskCompleted(int taskId) {
        Task task = taskRepository.findById(taskId).orElse(null);
        task.setStatus("Completed");
        taskRepository.save(task);

        // Update performance table
//        Performance performance = performanceRepository.findByEmployeeIdAndDate(task.getAssignedTo().getEmployeeId(), LocalDate.now())
//            .orElse(new Performance(task.getAssignedTo(), LocalDate.now(), 0));
//        performance.setTasksCompleted(performance.getTasksCompleted() + 1);
//        performanceRepository.save(performance);
    }
}

