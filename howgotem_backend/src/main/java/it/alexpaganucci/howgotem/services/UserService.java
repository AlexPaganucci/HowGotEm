package it.alexpaganucci.howgotem.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import it.alexpaganucci.howgotem.entities.User;
import it.alexpaganucci.howgotem.exceptions.PasswordMismatchException;
import it.alexpaganucci.howgotem.exceptions.UserNotFoundException;
import it.alexpaganucci.howgotem.payloads.UpdateUserRequest;
import it.alexpaganucci.howgotem.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	  public void deleteUserById(Long id) throws UserNotFoundException {
		    User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
		    userRepository.delete(user);
		  }
	  
	  public void updateUserById(Long id, UpdateUserRequest updateUserRequest) throws UserNotFoundException, PasswordMismatchException {
		    User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
		    if (updateUserRequest.getEmail() != null) {
		      user.setEmail(updateUserRequest.getEmail());
		    }
		    if (updateUserRequest.getName() != null) {
		      user.setName(updateUserRequest.getName());
		    }
		    if (updateUserRequest.getSurname() != null) {
		      user.setSurname(updateUserRequest.getSurname());
		    }
	        if (updateUserRequest.getConfirmPassword() == null || !updateUserRequest.getPassword().equals(updateUserRequest.getConfirmPassword())) {
	            throw new PasswordMismatchException("Password and confirm password do not match");
	        }
	        user.setPassword(passwordEncoder.encode(updateUserRequest.getPassword()));
	        if (updateUserRequest.getAddress() != null) {
	        	user.setAddress(updateUserRequest.getAddress());
	        }
	        if (updateUserRequest.getCity() != null) {
	        	user.setCity(updateUserRequest.getCity());
	        }
	        if (updateUserRequest.getPostalCode() != null) {
	        	user.setPostalCode(updateUserRequest.getPostalCode());
	        }
	        if (updateUserRequest.getBirthdate() != null) {
	        	user.setBirthdate(updateUserRequest.getBirthdate());
	        }
	        if (updateUserRequest.getSpeditionAddress() != null) {
	        	user.setSpeditionAddress(updateUserRequest.getSpeditionAddress());
	        }
	        if (updateUserRequest.getSpeditionCity() != null) {
	        	user.setSpeditionCity(updateUserRequest.getSpeditionCity());
	        }
	        if (updateUserRequest.getSpeditionPostalCode() != null) {
	        	user.setSpeditionPostalCode(updateUserRequest.getSpeditionPostalCode());
	        }
		    userRepository.save(user);
		  }
	  
	  public Optional<User> findById(Long id) {
		  return userRepository.findById(id);
	  }
}
