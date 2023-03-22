package it.alexpaganucci.howgotem.payloads;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import it.alexpaganucci.howgotem.validators.StrongPassword;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {

	@NotBlank
	@Email
	private String email;
	@NotBlank
	private String name;
	@NotBlank
	private String surname;
	private Set<String> roles;
	@StrongPassword
	@NotBlank
	@Size(min = 8, max = 40)
	private String password;
	@Column(name = "confirm-password")
	@NotBlank
	@Size(min = 8, max = 40)
	private String confirmPassword;
	@NotBlank
	private String address;
	@NotBlank
	private String city;
	@NotBlank
	@Size(min = 5, max = 5, message = "Il codice postale deve contenere esattamente 5 cifre")
	private String postalCode;
	@Temporal(TemporalType.DATE)
	private Date birthdate;
}
