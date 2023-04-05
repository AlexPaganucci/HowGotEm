package it.alexpaganucci.howgotem.email;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailDetails {

	private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
    
    public EmailDetails() {}
    
    public EmailDetails(String recipient, String msgBody, String subject) {
		this.recipient = recipient;
		this.msgBody = msgBody;
		this.subject = subject;
	}
    
	public EmailDetails(String recipient, String msgBody, String subject, String attachment) {
		this.recipient = recipient;
		this.msgBody = msgBody;
		this.subject = subject;
		this.attachment = attachment;
	}
}
