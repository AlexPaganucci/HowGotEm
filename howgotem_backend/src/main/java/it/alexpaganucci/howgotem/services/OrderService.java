package it.alexpaganucci.howgotem.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import it.alexpaganucci.howgotem.entities.Order;
import it.alexpaganucci.howgotem.entities.PaypalDataResponse;
import it.alexpaganucci.howgotem.repositories.OrderRepository;
import it.alexpaganucci.howgotem.repositories.PaypalRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private PaypalRepository paypalRepository;
	
	public void save(Order o) {
		orderRepository.save(o);
	}
	
	public void deleteOrderById(Long id) {
		orderRepository.deleteById(id);
	}
	
	public List<Order> filterOrderByUser(Long userId){
		return orderRepository.filterOrderByUser(userId);
	}
	
	public Optional<Order> findById(Long id){
		return orderRepository.findById(id);
	}
	
	public Order findLastOrder(){
		return orderRepository.findLastOrder();
	}
	
	public PaypalDataResponse savePaypalData(PaypalDataResponse paypalData) {
		return paypalRepository.save(paypalData);
	}
}
