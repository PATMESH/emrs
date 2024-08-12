package com.example.demo.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findByReportsTo(Employee reportsTo);
    List<Employee> findByEmail(String email);
}
