package com.example.emp_project.exceptions;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(Long id){
        super("Employee is not found with id"+id);
    }
}
