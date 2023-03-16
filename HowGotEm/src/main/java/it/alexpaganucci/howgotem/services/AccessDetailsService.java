package it.alexpaganucci.howgotem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.alexpaganucci.howgotem.auth.AccessDetails;
import it.alexpaganucci.howgotem.entities.User;
import it.alexpaganucci.howgotem.repositories.UserRepository;

@Service
public class AccessDetailsService implements UserDetailsService {

	@Autowired
	UserRepository ur;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String x) throws UsernameNotFoundException {
		User u = ur.findUserByEmail(x)
				.orElseThrow(() -> new UsernameNotFoundException("No User with Email '" + x + "' was Found."));
		return AccessDetails.build(u);
	}
}
