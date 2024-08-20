package com.example.demo.repo;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Attendance;
import com.example.demo.entity.Employee;
import java.util.List;



public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
	Attendance findByEmployeeAndDate(Employee employee, LocalDate date);
	List<Attendance> findByEmployee(Employee employee);
}