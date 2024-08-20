package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Attendance;
import com.example.demo.entity.Employee;
import com.example.demo.repo.AttendanceRepository;
import com.example.demo.repo.EmployeeRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public void markAttendance(int employeeId) {
        LocalDate today = LocalDate.now();
        LocalDateTime now = LocalDateTime.now();

        Optional<Employee> employeeOpt = employeeRepository.findById(employeeId);

        Employee employee = employeeOpt.get();

        Attendance attendance = attendanceRepository.findByEmployeeAndDate(employee, today);

        if (attendance == null) {
            attendance = new Attendance();
            attendance.setEmployee(employee);
            attendance.setDate(today);
            attendance.setLoginTime(now);
            attendanceRepository.save(attendance);
        } 
    }

	public List<Attendance> getAttendanceByEmployee(int employeeId) {
	
		Optional<Employee> employeeOpt = employeeRepository.findById(employeeId);

        Employee employee = employeeOpt.get();
        
        return attendanceRepository.findByEmployee(employee);
	}
}
