package it.alexpaganucci.howgotem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

import it.alexpaganucci.howgotem.exceptions.PasswordMismatchException;
import it.alexpaganucci.howgotem.exceptions.UserNotFoundException;
import it.alexpaganucci.howgotem.payloads.UpdateUserRequest;
import it.alexpaganucci.howgotem.services.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private UserService userSrv;
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('USER') and (#id == authentication.principal.id)")
	public ResponseEntity<?> deleteUser(@PathVariable Long id) throws UserNotFoundException{
	    try {
	        userSrv.deleteUserById(id);
	        return ResponseEntity.ok().build();
	    } catch (UserNotFoundException e) {
	        return ResponseEntity.notFound().build();
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasAuthority('USER') and (#id == authentication.principal.id)")
	public ResponseEntity<?> updateUserById(@PathVariable("id") Long id, @RequestBody UpdateUserRequest updateUserRequest) throws UserNotFoundException {
	    try {
	        userSrv.updateUserById(id, updateUserRequest);
	        return ResponseEntity.ok().build();
	    } catch (UserNotFoundException e) {
	        return ResponseEntity.notFound().build();
	    } catch (PasswordMismatchException pe) {
	    	return ResponseEntity.badRequest().body("Password and confirm password do not match");
	    }
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('USER') and (#id == authentication.principal.id)")
	public ResponseEntity<Object> findUserById(@PathVariable("id") Long id){
		return new ResponseEntity<>(userSrv.findById(id)
				.orElseThrow(()-> new UserNotFoundException("User not Found")), HttpStatus.OK);
	}
}
