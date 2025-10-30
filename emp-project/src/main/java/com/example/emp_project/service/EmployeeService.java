package com.example.emp_project.service;
import java.util.List;

import com.example.emp_project.entity.Employee;



public interface EmployeeService {
    String createEmployee(Employee employee);
    List<Employee> readEmployee();
    Employee updateEmployee(Long id ,Employee employee);
    boolean deleteEmployee(Long id);

    
}
