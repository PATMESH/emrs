package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    public void sendEmailToEmployee(String userEmail, String employeeName, String task, String managerName) throws MessagingException {
        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String htmlMsg = "<div style='font-family: Arial, sans-serif; color: #333;'>" +
                         "<h2 style='color: #0056b3;'>New Task Assigned</h2>" +
                         "<p>Dear " + employeeName + ",</p>" +
                         "<p>A new task has been assigned to you:</p>" +
                         "<p style='padding-left: 20px;'><strong>Task:</strong> " + task + "</p>" +
                         "<p style='padding-left: 20px;'><strong>Assigned by:</strong> " + managerName + "</p>" +
                         "<br>" +
                         "<p>Best regards,</p>" +
                         "<p><strong>EMRS - Tejas Networks</strong></p>" +
                         "</div>";

        helper.setText(htmlMsg, true);
        helper.setTo(userEmail);
        helper.setSubject("New Task Assigned");

        emailSender.send(mimeMessage);
    }
}
