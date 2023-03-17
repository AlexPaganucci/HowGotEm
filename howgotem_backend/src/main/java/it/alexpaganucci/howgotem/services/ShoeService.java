package it.alexpaganucci.howgotem.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.alexpaganucci.howgotem.entities.Shoe;
import it.alexpaganucci.howgotem.entities.Size;
import it.alexpaganucci.howgotem.repositories.ShoeRepository;
import it.alexpaganucci.howgotem.repositories.SizeRepository;

@Service
public class ShoeService {

	@Autowired
	private ShoeRepository shoeRepository;
	@Autowired
	private SizeRepository sizeRepository;
	
	public Shoe add(Shoe s) {
	    List<Size> sizes = s.getSizes();
	    s.setSizes(null); // rimuove le size dalla scarpa
	    Shoe savedShoe = shoeRepository.save(s); // salva la scarpa
	    // Aggiungi le size salvate alla scarpa
	    List<Size> savedSizes = new ArrayList<>();
	    for (Size size : sizes) {
	        size.setShoe(savedShoe); // Imposta la scarpa associata alla size
	        savedSizes.add(sizeRepository.save(size)); // Salva la size e aggiungila alla lista
	    }
	    savedShoe.setSizes(savedSizes); // Imposta la lista di size salvate nella scarpa
	    return savedShoe; // Restituisce la scarpa con le size salvate
	}
	
	public void delete(Long id) {
		shoeRepository.deleteById(id);
	}
	
	public List<Shoe> findAll() {
		return shoeRepository.findAll();
	}
	
	public Optional<Shoe> findById(Long id) {
		return shoeRepository.findById(id);
	}
	
	public List<Shoe> filterShoeByPartOfModel(String m){
		return shoeRepository.filterShoeByPartOfModel(m);
	}
	
	public List<Shoe> filterShoeByModel(String m){
		return shoeRepository.filterShoeByModel(m);
	}
	
	public Optional<Shoe> filterShoeBySkuCode(String s){
		return shoeRepository.filterShoeBySkuCode(s);
	}
	
	public List<Shoe> filterShoeByBrand(String b){
		return shoeRepository.filterShoeByBrand(b);
	}
	
	public List<Shoe> filterShoeByColor(String c){
		return shoeRepository.filterShoeByColor(c);
	}
	
	public List<Shoe> filterShoeBySize(double s){
		return shoeRepository.filterShoeBySize(s);
	}
	
	public List<Shoe> filterShoeByPrice(double p){
		return shoeRepository.filterShoeByPrice(p);
	}

}
