//package it.alexpaganucci.howgotem.utils;
//
//
//import java.util.Date;
//import java.util.Properties;
// 
//import javax.mail.Authenticator;
//import javax.mail.Message;
//import javax.mail.MessagingException;
//import javax.mail.PasswordAuthentication;
//import javax.mail.Session;
//import javax.mail.Transport;
//import javax.mail.internet.AddressException;
//import javax.mail.internet.InternetAddress;
//import javax.mail.internet.MimeMessage;
//
//public class EmailUtility {
//    public static void sendEmail(String host, String port,
//            final String userName, final String password, String toAddress,
//            String subject, String message) throws AddressException,
//            MessagingException {
// 
//        // Imposta le proprietà del server SMTP 
//        Properties properties = new Properties();
//        properties.put("mail.smtp.host", host);
//        properties.put("mail.smtp.port", port);
//        properties.put("mail.smtp.auth", "true");
//        properties.put("mail.smtp.ssl.trust", "smtp.gmail.com");
//        properties.put("mail.smtp.socketFactory.port", "465");  
//        properties.put("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");  
//        properties.put("mail.smtp.socketFactory.fallback", "false");  
//        properties.put("mail.smtp.ssl.protocols", "TLSv1.2");
//        // properties.put("mail.smtp.starttls.enable", "true");
// 
//        /* Authenticator 
//        Ottiene l'autenticazione per una connessione di rete
//        */    
//        // Crea un autenticatore nella sessione di posta 
//        Authenticator auth = new Authenticator() {
//            public PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication(userName, password);
//            }
//        };
//        
//        // Crea una sessione di posta e incorpora proprietà e autorizzazione
//        Session session = Session.getInstance(properties, auth); 
//        // Crea messaggio e-mail
//        Message msg = new MimeMessage(session); 
//        // InternetAddress: rappresenta un indirizzo e-mail Internet con sintassi user@host.domain
//        msg.setFrom(new InternetAddress(userName));
//        InternetAddress[] toAddresses = { new InternetAddress(toAddress) };
//        msg.setRecipients(Message.RecipientType.TO, toAddresses);
//        msg.setSubject(subject);
//        msg.setSentDate(new Date());
//        msg.setText(message);
//        
//        /* Transport 
//        Meccanismo di trasporto dei messaggi, utilizza il protocollo SMTP per inviare un messaggio
//        */
//        // Invia la mail
//        Transport.send(msg);
// 
//    }
//}
