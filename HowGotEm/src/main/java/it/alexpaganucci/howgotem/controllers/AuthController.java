package it.alexpaganucci.howgotem.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import javax.validation.Valid;

import org.apache.commons.lang3.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.alexpaganucci.howgotem.auth.AccessDetails;
import it.alexpaganucci.howgotem.entities.Role;
import it.alexpaganucci.howgotem.entities.User;
import it.alexpaganucci.howgotem.entities.enums.RoleType;
import it.alexpaganucci.howgotem.exceptions.RoleNotFoundException;
import it.alexpaganucci.howgotem.payloads.JwtResponse;
import it.alexpaganucci.howgotem.payloads.LoginRequest;
import it.alexpaganucci.howgotem.payloads.MessageResponse;
import it.alexpaganucci.howgotem.payloads.SignupRequest;
import it.alexpaganucci.howgotem.repositories.RoleRepository;
import it.alexpaganucci.howgotem.repositories.UserRepository;
import it.alexpaganucci.howgotem.utils.JwtUtils;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", allowedHeaders = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {


	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/login")	
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication a = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		return returnToken(a);
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest, BindingResult result) {
	    if (result.hasErrors()) {
	        List<String> errors = result.getAllErrors().stream()
	                .map(DefaultMessageSourceResolvable::getDefaultMessage)
	                .collect(Collectors.toList());
	        return ResponseEntity.badRequest().body(new MessageResponse("Validation errors: " + errors));
	    }
	    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
	        return ResponseEntity.badRequest().body(new MessageResponse("Email is already in use."));
	    }
	    if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
	        return ResponseEntity.badRequest().body(new MessageResponse("Passwords do not match."));
	    }
	    // Create new user's account
	    User user = User.builder().email(signUpRequest.getEmail())
	            .password(passwordEncoder.encode(signUpRequest.getPassword()))
	            .name(signUpRequest.getName())
	            .surname(signUpRequest.getSurname())
	            .address(signUpRequest.getAddress())
	            .city(signUpRequest.getCity())
	            .postalCode(signUpRequest.getPostalCode())
	            .build();

	    Set<String> roles = signUpRequest.getRoles();
	    Set<Role> userRoles = new HashSet<>();
	    if (roles == null) {
	        Role userRole = roleRepository.findByName(RoleType.USER).orElseThrow(() -> new RoleNotFoundException("Error: Role not found."));
	        userRoles.add(userRole);
	    } else {
	        for (String role : roles) {
	            RoleType roleType = EnumUtils.getEnumIgnoreCase(RoleType.class, role);
	            if (roleType != null) {
	                Optional<Role> optionalRole = roleRepository.findByName(roleType);
	                if (optionalRole.isPresent()) {
	                    userRoles.add(optionalRole.get());
	                } else {
	                    return ResponseEntity.badRequest().body(new MessageResponse("Invalid user role specified."));
	                }
	            } else {
	                return ResponseEntity.badRequest().body(new MessageResponse("Invalid user role specified."));
	            }
	        }
	    }
	    user.setRoles(userRoles);

	    try {
	        userRepository.save(user);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Unable to create user account. Please try again later."));
	    }

	    return returnToken(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), signUpRequest.getPassword())));
	}
	
	public ResponseEntity<?> returnToken(Authentication a) {
		SecurityContextHolder.getContext().setAuthentication(a);
		String jwt = jwtUtils.generateJwtToken(a);		
		AccessDetails uD = (AccessDetails) a.getPrincipal();		
		List<String> roles = uD.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		return ResponseEntity.ok(new JwtResponse(jwt, uD.getId(), uD.getEmail(), roles));
	}
}
