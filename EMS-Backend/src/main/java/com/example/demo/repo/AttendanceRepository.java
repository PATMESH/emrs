package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Attendance;


public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
}