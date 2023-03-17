package it.alexpaganucci.howgotem.exceptions;

public class ShoeNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public ShoeNotFoundException(Long id) {
        super("Shoe not found with id " + id);
    }
}
