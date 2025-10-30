package com.example.emp_project.service;
import java.util.*;

import org.springframework.stereotype.Service;

import com.example.emp_project.entity.Employee;
import com.example.emp_project.exceptions.EmployeeNotFoundException;
import com.example.emp_project.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;

    public  EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository=employeeRepository;
    
        
    }

    @Override
    public String createEmployee(Employee employee) {
        employeeRepository.save(employee);
        return "Saved Successfully.";
    }

    @Override
    public List<Employee> readEmployee() {
       return employeeRepository.findAll();
        

    }
    

   @Override
public boolean deleteEmployee(Long id) {
    if(employeeRepository.existsById(id)){
        employeeRepository.deleteById(id);
        return true;
    }
    return false;
}

   @Override
   public Employee updateEmployee(Long id, Employee employee) {
    Employee existed = getStudentsById(id);
    existed.setName(employee.getName());
    existed.setEmail(employee.getEmail());
    existed.setPhoneno(employee.getPhoneno());
    return employeeRepository.save(existed);
    
   }

   public Employee getStudentsById(Long id) {
   return employeeRepository.findById(id)
    .orElseThrow(()-> new EmployeeNotFoundException(id));
   }

    
    
}
