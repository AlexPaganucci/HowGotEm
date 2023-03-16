package it.alexpaganucci.howgotem.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.alexpaganucci.howgotem.entities.Size;
import it.alexpaganucci.howgotem.exceptions.OutOfStockException;
import it.alexpaganucci.howgotem.exceptions.SizeNotFoundException;
import it.alexpaganucci.howgotem.repositories.SizeRepository;

@Service
public class SizeService {

	@Autowired
	private SizeRepository sizeRepository;
	
	public void save(Size s) {
		sizeRepository.save(s);
	}
	
	public void delete(Long id) {
		sizeRepository.deleteById(id);
	}
	
	public Optional<Size> findById(Long id) {
		return sizeRepository.findById(id);
	}
	
	public void decreaseQuantity(Long shoeId, Long sizeId, int quantity) {
        Size size = sizeRepository.findByShoeIdAndId(shoeId, sizeId)
            .orElseThrow(() -> new SizeNotFoundException(sizeId));
        int availableQuantity = size.getQuantityAvailable();
        if (availableQuantity < quantity) {
            throw new OutOfStockException("Not enough stock for this size");
        }
        size.setQuantityAvailable(availableQuantity - quantity);
        sizeRepository.save(size);
    }
}
