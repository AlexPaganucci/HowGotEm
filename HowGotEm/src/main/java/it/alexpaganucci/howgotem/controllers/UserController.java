package it.alexpaganucci.howgotem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import it.alexpaganucci.howgotem.exceptions.UserNotFoundException;
import it.alexpaganucci.howgotem.payloads.UpdateUserRequest;
import it.alexpaganucci.howgotem.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userSrv;
	
	@DeleteMapping("/{id}")
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
	public ResponseEntity<?> updateUserById(@PathVariable("id") Long id, @RequestBody UpdateUserRequest updateUserRequest) throws UserNotFoundException {
	    try {
	        userSrv.updateUserById(id, updateUserRequest);
	        return ResponseEntity.ok().build();
	    } catch (UserNotFoundException e) {
	        return ResponseEntity.notFound().build();
	    }
	}
}
