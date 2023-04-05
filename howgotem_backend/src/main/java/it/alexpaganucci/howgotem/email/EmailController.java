package it.alexpaganucci.howgotem.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.alexpaganucci.howgotem.entities.Order;
import it.alexpaganucci.howgotem.entities.User;
import it.alexpaganucci.howgotem.exceptions.UserNotFoundException;
import it.alexpaganucci.howgotem.services.OrderService;
import it.alexpaganucci.howgotem.services.UserService;

@RestController
@RequestMapping("/api/email")
public class EmailController {


	@Autowired
	private EmailServiceImpl emailService;
	@Autowired
	private UserService userService;
	@Autowired
	private OrderService orderService;

	// Sending a simple Email
	@PostMapping("/send")
	public String sendMail(@RequestBody EmailDetails details) {
		String status = emailService.sendSimpleMail(details);
		return status;
	}

	// Sending email with attachment
	@PostMapping("/sendMailWithAttachment")
	public String sendMailWithAttachment(@RequestBody EmailDetails details) {
		String status = emailService.sendMailWithAttachment(details);
		return status;
	}
	
	@PostMapping("/sendOrderEmail/{userId}/{orderId}")
	public ResponseEntity<String> sendOrderEmail(@PathVariable Long userId, @PathVariable Long orderId) {
	    User user = this.userService.findById(userId).orElseThrow(() -> new UserNotFoundException("user non trovato"));
	    Order order = this.orderService.findById(orderId).orElseThrow(() -> new RuntimeException());
	    String result = emailService.sendEmailOrder(user, order);
	    return ResponseEntity.ok(result);
	}
}
