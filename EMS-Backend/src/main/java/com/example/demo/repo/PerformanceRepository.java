package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Performance;

public interface PerformanceRepository extends JpaRepository<Performance, Integer> {
}