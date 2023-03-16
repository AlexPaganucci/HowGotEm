package it.alexpaganucci.howgotem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.alexpaganucci.howgotem.entities.Role;
import it.alexpaganucci.howgotem.repositories.RoleRepository;

@Service
public class RoleService {
	
	@Autowired
	private RoleRepository roleRepository;
	
	public void save(Role r) {
		roleRepository.save(r);
	}

}
