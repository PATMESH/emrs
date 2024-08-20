package com.example.demo.controller;


import com.example.demo.entity.Attendance;
import com.example.demo.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/{employeeId}")
    public ResponseEntity<List<Attendance>> getAttendanceByEmployee(@PathVariable int employeeId) {
    	List<Attendance> attendanceList = attendanceService.getAttendanceByEmployee(employeeId);
        return ResponseEntity.ok(attendanceList);
    }
}
