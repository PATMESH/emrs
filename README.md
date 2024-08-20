# Employee Maintenance and Reporting System

This project is an Employee Maintenance and Reporting System built with **ReactJS** for the frontend, **Spring Boot** for the backend, and **MySQL** as the database. The system facilitates employee management, task assignments, performance tracking, and email notifications.

## Features

### Employee Management
- **Add and Remove Employees**: Allows for the addition and removal of employees.
- **Reporting Structure**: Employees report to respective managers.

### Manager Features
- **Team Overview**: Managers can view the list of employees in their team.
- **Task Assignment**: Managers can assign tasks to employees.
- **Email Notifications**: Automatic email notifications are sent to employees when a new task is assigned.

### Employee Features
- **Task Management**: Employees can view and mark tasks as completed.
- **Performance Tracking**: Employees can track their performance and view reports.

### Profile Management
- **Profile Updates**: Employees can manage their personal profiles.
- **Attendance Reporting**: Employees can view their attendance records.

### Authentication and Security
- **User Authentication**: Secure login for employees and managers using Spring Security.
- **Role-Based Access**: Different roles for employees and managers, restricting access based on roles.

### Email Notifications
- **Task Assignment Notifications**: Employees receive email notifications when a new task is assigned by the manager using SMTP.

## Technologies Used

- **Frontend**: ReactJS
- **Backend**: Spring Boot
- **Database**: MySQL
- **Build Tool**: Maven
- **Email Service**: SMTP for email notifications
- **Security**: Spring Security

## Project Structure

```plaintext
employee-maintenance-reporting-system/
├── EMS-Backend/
│   ├── src/main/java/com/example/emrs/ (Spring Boot application code)
│   ├── src/main/resources/application.properties (Database and SMTP configuration)
│   └── pom.xml (Maven dependencies)
├── React-frontend/
│   ├── src/ (ReactJS application code)
│   ├── public/
│   ├── package.json (Node.js dependencies)
│   └── README.md (Frontend-specific instructions)
└── README.md (Project overview)




Setup Instructions
Prerequisites

    Java 8+: Required for running the Spring Boot backend.
    Node.js: Required for running the ReactJS frontend.
    MySQL: Database for storing employee and task data.

Backend Setup (Spring Boot)

    Clone the repository and navigate to the EMS-Backend directory:

    bash

git clone https://github.com/yourusername/employee-maintenance-reporting-system.git
cd employee-maintenance-reporting-system/EMS-Backend

Configure MySQL database in src/main/resources/application.properties:

properties

spring.datasource.url=jdbc:mysql://localhost:3306/employeedb
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# SMTP Configuration
spring.mail.host=smtp.example.com
spring.mail.port=587
spring.mail.username=your-email@example.com
spring.mail.password=your-email-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

Build and run the Spring Boot application:

bash

    mvn clean install
    mvn spring-boot:run

    The backend should now be running on http://localhost:8080.

Frontend Setup (ReactJS)

    Navigate to the React-frontend directory:

    bash

cd ../React-frontend

Install dependencies:

bash

npm install

Start the ReactJS application:

bash

    npm start

    The frontend should now be running on http://localhost:3000.

Database Setup

    Create a MySQL database:

    sql

    CREATE DATABASE emrs;

    The application will automatically create the required tables on startup.

Email Notifications for Task Assignments

When a manager assigns a new task to an employee, an email notification is automatically sent to the employee’s registered email address.
SMTP Configuration

Make sure the SMTP settings are configured correctly in application.properties:

properties

spring.mail.host=smtp.example.com
spring.mail.port=587
spring.mail.username=your-email@example.com
spring.mail.password=your-email-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true


Authentication and Authorization

    The system uses Spring Security for user authentication and role-based access control.
    Employees and managers must log in to access the system.

Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome to improve the system's features and functionality.
License

This project is licensed under the MIT License. See the LICENSE file for details.
