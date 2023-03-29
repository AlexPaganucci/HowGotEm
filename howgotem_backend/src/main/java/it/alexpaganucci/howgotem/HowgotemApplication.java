package it.alexpaganucci.howgotem;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import it.alexpaganucci.howgotem.entities.Role;
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
		
//		User u = new User("alex.paganucci@gmail.com", "Alex", "Paganucci", passwordEncoder.encode("Alexpaga1994"), "Via Bellandra 25/E", "Fano", "61032", new GregorianCalendar(1994, Calendar.JULY, 9).getTime());
//		Role r = new Role(RoleType.USER);
//		Role r1 = new Role(RoleType.ADMIN);
//		u.setRoles(new HashSet<>() {{
//			add(r);
//			add(r1);
//		}});
//		roleRepository.save(r);
//		roleRepository.save(r1);
//		userRepository.save(u);
	}
}
