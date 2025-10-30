package com.example.emp_project.controller;

import java.util.*;


import com.example.emp_project.entity.Employee;
import com.example.emp_project.service.EmployeeService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;




@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api")

public class EmpController {
    //EmployeeService employeeService =new EmployeeServiceImpl() {
        
   // };
    @Autowired
    private EmployeeService employeeService;
   
    
    
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.readEmployee() ;
    }

    @PostMapping("/employees")
    public ResponseEntity<String> createEmployee(@RequestBody Employee employee) {
        String result =employeeService.createEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
    @DeleteMapping("/employees/{id}")
    public String deleteEmployee(@PathVariable Long id){
         if (employeeService.deleteEmployee(id))
         return "Delete Successfully.";
         
         return "Employee Not Found.";
    
    }
    @PutMapping("/employees/{id}")
    public Employee updateEmployee(@PathVariable  Long id, @RequestBody Employee employee) {
       
        return employeeService.updateEmployee(id, employee);
    }

    
    
    
}
