package it.alexpaganucci.howgotem.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.alexpaganucci.howgotem.entities.Shoe;
import it.alexpaganucci.howgotem.entities.Size;
import it.alexpaganucci.howgotem.exceptions.ShoeNotFoundException;
import it.alexpaganucci.howgotem.payloads.ShoeDto;
import it.alexpaganucci.howgotem.payloads.SizeDto;
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

	public Shoe updateShoeSize(Long shoeId, ShoeDto shoeDto) {
	    Optional<Shoe> optionalShoe = shoeRepository.findById(shoeId);
	    if (optionalShoe.isPresent()) {
	        Shoe existingShoe = optionalShoe.get();
	        // Update shoe details
	        existingShoe.setModel(shoeDto.getModel());
	        existingShoe.setSkuCode(shoeDto.getSkuCode());
	        existingShoe.setBrand(shoeDto.getBrand());
	        existingShoe.setColor(shoeDto.getColor());
	        existingShoe.setUrlImg(shoeDto.getUrlImg());

	        // Update shoe sizes
	        List<SizeDto> newSizeDtos = shoeDto.getSizes();
	        List<Size> existingSizes = existingShoe.getSizes();

	        // Iterate through each new size and update or add it to the existing sizes
	        for (SizeDto newSizeDto : newSizeDtos) {
	            boolean sizeFound = false;
	            for (Size existingSize : existingSizes) {
	                if (existingSize.getSize() == newSizeDto.getSize()) {
	                    existingSize.setQuantityAvailable(newSizeDto.getQuantityAvailable());
	                    existingSize.setPrice(newSizeDto.getPrice());
	                    sizeFound = true;
	                    break;
	                }
	            }
	            // If the size was not found, add a new size to the existing sizes
	            if (!sizeFound) {
	                Size newShoeSize = new Size(newSizeDto.getSize(), newSizeDto.getQuantityAvailable(), newSizeDto.getPrice(), existingShoe);
	                existingSizes.add(newShoeSize);
	                existingShoe.setSizes(existingSizes);
	            }
	        }
	        Shoe updatedShoe = add(existingShoe);
	        return updatedShoe;
	    } else {
	        // Throw exception if shoe does not exist
	        throw new ShoeNotFoundException(shoeId);
	    }
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
	
	public List<String> findAllDistinctBrands() {
	    return shoeRepository.findAllDistinctBrands();
	}
	
	public List<String> findAllDistinctSize() {
	    return sizeRepository.findAllDistinctSize();
	}

	public List<Shoe> filterShoeByPartOfModel(String m) {
		return shoeRepository.filterShoeByPartOfModel(m);
	}

	public List<Shoe> filterShoeByModel(String m) {
		return shoeRepository.filterShoeByModel(m);
	}

	public Optional<Shoe> filterShoeBySkuCode(String s) {
		return shoeRepository.filterShoeBySkuCode(s);
	}

	public List<Shoe> filterShoesByBrands(List<String> b) {
		return shoeRepository.filterShoesByBrands(b);
	}

	public List<Shoe> filterShoeByColor(String colors) {
	    return shoeRepository.filterShoesByColor(colors);
	}

	public List<Shoe> filterShoeBySizes(List<Double> sizes) {
	    return shoeRepository.filterShoeBySizes(sizes);
	}

	public List<Shoe> filterShoeByPrice(double p) {
		return shoeRepository.filterShoeByPrice(p);
	}

}
