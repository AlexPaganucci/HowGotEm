package it.alexpaganucci.howgotem;

import java.util.ArrayList;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import it.alexpaganucci.howgotem.entities.Order;
import it.alexpaganucci.howgotem.entities.OrderShoe;
import it.alexpaganucci.howgotem.entities.Role;
import it.alexpaganucci.howgotem.entities.Shoe;
import it.alexpaganucci.howgotem.entities.Size;
import it.alexpaganucci.howgotem.entities.User;
import it.alexpaganucci.howgotem.entities.enums.RoleType;
import it.alexpaganucci.howgotem.repositories.RoleRepository;
import it.alexpaganucci.howgotem.repositories.UserRepository;
import it.alexpaganucci.howgotem.services.OrderService;
import it.alexpaganucci.howgotem.services.OrderShoeService;
import it.alexpaganucci.howgotem.services.ShoeService;
import it.alexpaganucci.howgotem.services.SizeService;

@SpringBootApplication
public class HowgotemApplication implements CommandLineRunner{

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private OrderService orderService;
	@Autowired
	private OrderShoeService orderShoeService;
	@Autowired
	private ShoeService shoeService;
	@Autowired
	private SizeService sizeService;
	
	
	public static void main(String[] args) {
		SpringApplication.run(HowgotemApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
//		PROVE DI INSERIMENTO PER VEDERE LE TABELLE
		
//		User u = new User("alex.paganucci@gmail.com", "Alex", "Paganucci", passwordEncoder.encode("Alexpaga1994"), "Via Bellandra 25/E", "Fano", "61032");
//		Role r = new Role(RoleType.USER);
//		Role r1 = new Role(RoleType.ADMIN);
//		u.setRoles(new HashSet<>() {{
//			add(r);
//			add(r1);
//		}});
//		Shoe s1 = new Shoe("Dunk", "alkhdflk458", "Nike", "White/Black");
//		Shoe s2 = new Shoe("Jordan4", "sldtrred458", "Nike", "Red/White");
//		Size sd1 = new Size(43, 5, 359.99, s1);
//		Size sd2 = new Size(44, 3, 309.99, s1);
//		Size sj1 = new Size(43, 5, 350.99, s2);
//		Size sj2 = new Size(44, 3, 300.99, s2);
//		Order o = new Order(u, 359.99);
//		OrderShoe os = new OrderShoe(s1, sd1, 1);
//		roleRepository.save(r);
//		roleRepository.save(r1);
//		userRepository.save(u);
//		shoeService.add(s1);
//		shoeService.add(s2);
//		sizeService.save(sj1);
//		sizeService.save(sj2);
//		sizeService.save(sd1);
//		sizeService.save(sd2);
//		orderService.save(o);
//		orderShoeService.save(os);
		
	}
}
