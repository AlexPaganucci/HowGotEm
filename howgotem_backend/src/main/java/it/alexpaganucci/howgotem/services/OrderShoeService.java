package it.alexpaganucci.howgotem.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.alexpaganucci.howgotem.entities.OrderShoe;
import it.alexpaganucci.howgotem.entities.Shoe;
import it.alexpaganucci.howgotem.entities.User;
import it.alexpaganucci.howgotem.exceptions.UserNotFoundException;
import it.alexpaganucci.howgotem.repositories.OrderShoeRepository;

@Service
public class OrderShoeService {

	@Autowired
	private OrderShoeRepository orderShoeRepository;
	@Autowired
	private UserService userService;
	
	public void save(OrderShoe os) {
		orderShoeRepository.save(os);
	}
	
	public void delete(Long id) {
		orderShoeRepository.deleteById(id);
	}
	
	
}
