package com.eventticketing.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Async
    public void sendTicketEmail(
            String to,
            String subject,
            String body,
            byte[] attachment,
            String filename
    ) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);

            helper.setSubject(subject);

            helper.setText(body);

            helper.addAttachment(
                    filename,
                    new ByteArrayResource(attachment)
            );

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(
                    "Failed to send email: " + e.getMessage(),
                    e
            );
        }
    }
}
