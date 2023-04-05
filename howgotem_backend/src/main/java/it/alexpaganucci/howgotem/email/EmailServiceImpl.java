package it.alexpaganucci.howgotem.email;

import java.io.File;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import it.alexpaganucci.howgotem.entities.Order;
import it.alexpaganucci.howgotem.entities.OrderShoe;
import it.alexpaganucci.howgotem.entities.User;

@Service
public class EmailServiceImpl implements EmailService{

	@Autowired 
	private JavaMailSender javaMailSender;
	 
    @Value("${spring.mail.username}") 
    private String sender;
 
    // To send a simple email
    public String sendSimpleMail(EmailDetails details) {
        try { 
            // Creating a simple mail message
            SimpleMailMessage mailMessage = new SimpleMailMessage(); 
            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject()); 
            // Sending the mail
            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        } 
        catch (Exception e) {
            return "Error while Sending Mail: " + e;
        }
    }
 
    // To send an email with attachment
    public String sendMailWithAttachment(EmailDetails details) {
        // Creating a mime message
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper; 
        try { 
            // Setting multipart as true for attachments to be send
            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecipient());
            mimeMessageHelper.setText(details.getMsgBody());
            mimeMessageHelper.setSubject(details.getSubject()); 
            // Adding the attachment
            FileSystemResource file = new FileSystemResource(new File(details.getAttachment())); 
            mimeMessageHelper.addAttachment(file.getFilename(), file); 
            // Sending the mail
            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        }
        catch (MessagingException e) { 
            return "Error while sending mail!!!";
        }
    }
    
    
    
    
    public String sendEmailOrder(User user, Order order) {
        try {  
        	SimpleMailMessage customerMail = new SimpleMailMessage(); 
            customerMail.setFrom(sender);
            customerMail.setTo(user.getEmail());
            customerMail.setSubject("Shipping Details");
            // Set the message body to include the shipping details
            customerMail.setText("Gentile " + user.getName() + user.getSurname() + ",\n\nAbbiamo ricevuto la sua richiesta di ordine e la ringraziamo per averci scelto.\n\nDi seguito sono elencati i dettagli del suo ordine:\n\n" + getOrderDetails(order) + "\nIl team di HowGotEm.");
            // Sending the mail to the customer
            javaMailSender.send(customerMail);
            
            // Creating a simple mail message for you
            SimpleMailMessage ownerMail = new SimpleMailMessage(); 
            ownerMail.setFrom(sender);
            ownerMail.setTo(sender);
            ownerMail.setSubject("Shipping Details for " + user.getName() + user.getSurname());
            // Set the message body to include the shipping details
            ownerMail.setText("Abbiamo ricevuto una richiesta di un ordine da parte di " + user.getName() + user.getSurname() + ",\n"
            		+ "\nInformazioni dell'utente:\nemail: " + user.getEmail() + "\nindirizzo: " + user.getAddress() + "\n"
            				+ "indirizzo di spedizione: " + user.getSpeditionAddress() + "\n"
            						+ "città di spedizione: " + user.getSpeditionCity() + "\n"
            								+ "CAP: " + user.getSpeditionPostalCode() + "\n\nDi seguito sono elencati i dettagli dell'ordine:"
            										+ "\n\n" + getOrderDetails(order));
            // Sending the mail to you
            javaMailSender.send(ownerMail);
            
            return "Mail Sent Successfully...";
        } catch (Exception e) {
            return "Error while Sending Mail: " + e;
        }
    }
    
    private String getOrderDetails(Order order) {
        StringBuilder sb = new StringBuilder();
        for (OrderShoe orderShoe : order.getShoes()) {
            sb.append("Marca: ").append(orderShoe.getShoe().getBrand())
                    .append("\nModello: ").append(orderShoe.getShoe().getModel())
                    
//                    .append("\nTaglia: ").append(orderShoe.getSize())
//                    .append("\nQuantità: ").append(orderShoe.getQuantities())
                    .append("\n\n");
        }
        sb.append("Totale: ").append(order.getTotalPrice());
        return sb.toString();
    }
}
