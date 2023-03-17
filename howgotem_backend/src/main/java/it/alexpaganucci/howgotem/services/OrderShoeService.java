package it.alexpaganucci.howgotem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.alexpaganucci.howgotem.entities.OrderShoe;
import it.alexpaganucci.howgotem.repositories.OrderShoeRepository;

@Service
public class OrderShoeService {

	@Autowired
	private OrderShoeRepository orderShoeRepository;
	
	public void save(OrderShoe os) {
		orderShoeRepository.save(os);
	}
	
	public void delete(Long id) {
		orderShoeRepository.deleteById(id);
	}
}
