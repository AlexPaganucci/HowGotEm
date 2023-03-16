package it.alexpaganucci.howgotem.payloads;

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
	private Set<String> roles;
	@StrongPassword
	@NotBlank
	@Size(min = 6, max = 40)
	private String password;
	@NotBlank
	@Size(min = 6, max = 40)
	private String confirmPassword;
	
}
