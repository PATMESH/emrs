package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Employee;
import com.example.demo.repo.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(int id, Employee employee) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
        existingEmployee.setName(employee.getName());
        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setPhoneNumber(employee.getPhoneNumber());
        existingEmployee.setDepartment(employee.getDepartment());
        existingEmployee.setRole(employee.getRole());
        existingEmployee.setReportsTo(employee.getReportsTo());
        return employeeRepository.save(existingEmployee);
    }

    public void deleteEmployee(int id) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
        employeeRepository.delete(existingEmployee);
    }
    
    
    public Employee getEmployeeInfo(int id) {
    	return employeeRepository.findById(id).orElse(null);
    }
    
    public Employee getEmployeeByEmail(String email) {
        List<Employee> employees = employeeRepository.findByEmail(email);
        if (employees.isEmpty()) {
            return null;
        }
        return employees.get(0);
    }

    
    public List<Employee> getEmployeeOrg(int id) {
    	Employee e = employeeRepository.findById(id).orElse(null);
    	return employeeRepository.findByReportsTo(e);
    }
    
    public Employee authenticateUser(String email , String password) {
    	Employee e = employeeRepository.findByEmail(email).get(0);
    	if(e==null) {
    		return null;
    	}
    	if(e.getPassword().equals(password))return e;
    	return null;
    }

	public List<Employee> findAllEmployees() {
		return employeeRepository.findAll();
	}
    
}
