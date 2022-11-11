package de.osiem.leaguechat.auth.service;

import javax.transaction.Transactional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MailService {
    
    private final Environment env;
    private final JavaMailSender javaMailSender;

    public void sendMail(String mailAdress, String mailTitle, String mailMessage){
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(env.getProperty("spring.mail.username"));
        mail.setTo(mailAdress);
        mail.setSubject(mailTitle);
        mail.setText(mailMessage);
        javaMailSender.send(mail);
    }
}
