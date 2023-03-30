package it.alexpaganucci.howgotem.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.alexpaganucci.howgotem.entities.Order;
import it.alexpaganucci.howgotem.entities.OrderShoe;
import it.alexpaganucci.howgotem.entities.Shoe;
import it.alexpaganucci.howgotem.entities.Size;
import it.alexpaganucci.howgotem.entities.User;
import it.alexpaganucci.howgotem.exceptions.ShoeNotFoundException;
import it.alexpaganucci.howgotem.exceptions.SizeNotFoundException;
import it.alexpaganucci.howgotem.exceptions.UserNotFoundException;
import it.alexpaganucci.howgotem.payloads.OrderRequest;
import it.alexpaganucci.howgotem.payloads.OrderShoeRequest;
import it.alexpaganucci.howgotem.services.OrderService;
import it.alexpaganucci.howgotem.services.OrderShoeService;
import it.alexpaganucci.howgotem.services.ShoeService;
import it.alexpaganucci.howgotem.services.SizeService;
import it.alexpaganucci.howgotem.services.UserService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/order")
public class OrderController {
	
	@Autowired
	private UserService userService;
	@Autowired
	private ShoeService shoeService;
	@Autowired
	private SizeService sizeService;
	@Autowired
	private OrderService orderService;
	@Autowired
	private OrderShoeService orderShoeService;
	
	@PostMapping
	public ResponseEntity<Order> saveOrder(@RequestBody OrderRequest orderRequest) {
		log.info("Received order request: {}", orderRequest);
	    User user = userService.findById(orderRequest.getUserId())
	    		.orElseThrow(() -> new UserNotFoundException("User not found"));
	    List<OrderShoe> orderShoes = new ArrayList<>();
	    for (OrderShoeRequest shoe : orderRequest.getShoes()) {
	        Shoe s = shoeService.findById(shoe.getShoeId())
	        		.orElseThrow(() -> new ShoeNotFoundException(shoe.getShoeId()));
	        Size size = sizeService.findById(shoe.getSizeId())
	        		.orElseThrow(() -> new SizeNotFoundException(shoe.getSizeId()));
	        int quantities = shoe.getQuantities();
	        sizeService.decreaseQuantity(shoe.getShoeId(), shoe.getSizeId(), quantities);
	        OrderShoe orderShoe = new OrderShoe(s, size, shoe.getQuantities());
	        orderShoes.add(orderShoe);
	    }
	    double totalPrice = calculateTotalPrice(orderShoes); // Metodo per calcolare il prezzo totale
	    Order order = new Order(user, totalPrice);
	    order.setShoes(orderShoes);
	    orderService.save(order);
	    return new ResponseEntity<>(order, HttpStatus.CREATED);
	}
	
    private double calculateTotalPrice(List<OrderShoe> orderShoes) {
        double totalPrice = 0.0;
        for (OrderShoe orderShoe : orderShoes) {
            totalPrice += orderShoe.getSize().getPrice() * orderShoe.getQuantities();
        }
        return totalPrice;
    }
//    DA CONTROLLARE 
    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('USER') and (#id == authentication.principal.id)")
    public ResponseEntity<?>deleteOrder(@PathVariable Long id){
		Optional<Order> optOrder = orderService.findById(id);
		if( !optOrder.isPresent() )  {
			return new ResponseEntity<>("ORDINE NON TROVATO",HttpStatus.NOT_FOUND);
		} else {
			Order o = optOrder.get();
			orderService.deleteOrderById(o.getId());
		}
		return new ResponseEntity<>(
				String.format("Scarpa con id %d cancellata!", id), HttpStatus.OK);
	}
    
    @GetMapping("/filter_by_user={id}")
    @PreAuthorize("hasAuthority('USER') and (#id == authentication.principal.id)")
    public ResponseEntity<List<Order>> filterOrderByUser(@PathVariable Long id){
    	return new ResponseEntity<>(orderService.filterOrderByUser(id), HttpStatus.OK);
    }
    
}


