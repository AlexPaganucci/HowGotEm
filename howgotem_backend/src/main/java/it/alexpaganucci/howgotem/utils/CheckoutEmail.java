//package it.alexpaganucci.howgotem.utils;
//
//
//public class CheckoutEmail {
//	
//	 private String host;
//	 private String port;
//	 private String user;
//	 private String pass;
//
//	 public void init() {
//		 host = "smtp.gmail.com";
//		 port = "465";
//		 user = "alex.paganucci@gmail.com";
//		 pass = "ejcpvmneowhvhklg";
//	}
//
//	public void myEmail() {
//		String recipient = "paganucci1994@gmail.com";
//        String subject = "Conferma Acquisto Da Java Web Ecommerce";
//        String content = "Abbiamo ricevuto il tuo ordine di acquisto.\n"
//        		+ "La consegna è prevista per domani.\n"
//        		+ "Grazie"; 
//        String resultMessage = "";
// 
//        try {
//            EmailUtility.sendEmail(host, port, user, pass, recipient, subject, content);
//            resultMessage = "Email inviata";
//        } catch (Exception ex) {
//            ex.printStackTrace();
//            resultMessage = "Errore invio email: " + ex.getMessage();
//        }
//	}
//
//}
