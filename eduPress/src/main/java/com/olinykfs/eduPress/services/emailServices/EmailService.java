package com.olinykfs.eduPress.services.emailServices;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendConfirmationEmail(String to, String confirmationUrl) {
        try {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        String htmlContent = """
            <html>
            <body>
                <h1 style="color: #4CAF50;">Email Confirmation</h1>
                <p>Thank you for signing up with us! To activate your account, please click the link below:</p>
                <a href="%s" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Your Account</a>
                <p>If you did not sign up on our platform, please disregard this email. Your account will not be affected.</p>
                <p>For any issues or questions, feel free to contact us at support@example.com. We're here to help!</p>
                <p>Best regards,</p>
                <p>The EduPress Team</p>
            </body>
            </html>
        """.formatted(confirmationUrl);

        helper.setTo(to);
        helper.setSubject("Activate Your EduPress Account");
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.out.println(e.getMessage());

        }
    }
    public void sendUpdateConfirmationEmail(String to, String confirmationUrl) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            String htmlContent = """
            <html>
            <body>
                <h1 style="color: #4CAF50;">Email Confirmation</h1>
                <p>To Confirm your new Email Address , please click the link below:</p>
                <a href="%s" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Your Account</a>
                <p>If you did not sign up on our platform, please disregard this email. Your account will not be affected.</p>
                <p>If you didnt change your email address, change your account password</p>
                <p>For any issues or questions, feel free to contact us at megaeaye@gmail.com. We're here to help!</p>
                <p>Best regards,</p>
                <p>The EduPress Team</p>
            </body>
            </html>
        """.formatted(confirmationUrl);

            helper.setTo(to);
            helper.setSubject("Activate Your EduPress Account");
            helper.setText(htmlContent, true);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.out.println(e.getMessage());

        }
    }
}
