package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {
	 List<Task> findByAssignedTo(Employee assignedTo);
}