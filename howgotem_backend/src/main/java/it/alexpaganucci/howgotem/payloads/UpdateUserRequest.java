package it.alexpaganucci.howgotem.payloads;

import java.util.Date;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import it.alexpaganucci.howgotem.validators.StrongPassword;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserRequest {
	
	@NotBlank
	@Email
	private String email;
	@NotBlank
	private String name;
	@NotBlank
	private String surname;
	@StrongPassword
	@NotBlank
	@Size(min = 6, max = 40)
	private String password;
	@NotBlank
	@Size(min = 6, max = 40)
	private String confirmPassword;
	@NotBlank
	private String address;
	@NotBlank
	private String city;
	@NotBlank
	@Size(min = 5, max = 5, message = "Il codice postale deve contenere esattamente 5 cifre")
	private String postalCode;
	@NotBlank
	private Date birthdate;	
	@NotBlank
	private String speditionAddress;
	@NotBlank
	private String speditionCity;
	@NotBlank
	@Size(min = 5, max = 5, message = "Il codice postale deve contenere esattamente 5 cifre")
	private String speditionPostalCode;
}
