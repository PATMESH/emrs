package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.example.demo.entity.Employee;
import com.example.demo.service.AttendanceService;
import com.example.demo.service.EmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    
    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/add")
    public ResponseEntity<?> addEmployee(@RequestBody Employee employee) {
        Employee existingEmployee = employeeService.getEmployeeByEmail(employee.getEmail());

        if (existingEmployee != null) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Email already exists");
        }

        Employee savedEmployee = employeeService.saveEmployee(employee);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.findAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Employee> editEmployee(@PathVariable int id, @RequestBody Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employee);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeEmployee(@PathVariable int id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>("Employee removed successfully", HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployees(@PathVariable int id){
    	Employee e =  employeeService.getEmployeeInfo(id);
    	return new ResponseEntity<>(e , HttpStatus.OK);
    }
    
    @GetMapping("/org/{id}")
    public ResponseEntity<List<Employee>> getEmployeeOrg(@PathVariable int id){
    	List<Employee> e =  employeeService.getEmployeeOrg(id);
    	return new ResponseEntity<>(e , HttpStatus.OK);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Employee user = employeeService.authenticateUser(email, password);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        String token = generateToken(user);

        List<Employee> subordinates = employeeService.getEmployeeOrg(user.getEmployeeId());

        String userType = "Employee";
        if (!subordinates.isEmpty()) {
            userType = "Manager";
        }
        
        Map<String, Object> response = new HashMap<>(); 
        response.put("token", token);
        response.put("name", user.getName());
        response.put("employeeId", user.getEmployeeId());  
        response.put("userType", userType);

        
        attendanceService.markAttendance(user.getEmployeeId());

        return ResponseEntity.ok(response);
    }

    private String generateToken(Employee user) {
        return ("userId=" + user.getEmployeeId() + ", email=" + user.getEmail());
    }
}
