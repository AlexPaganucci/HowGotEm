package it.alexpaganucci.howgotem.exceptions;

public class SizeNotFoundException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;

	public SizeNotFoundException(Long id) {
        super("Size not found with id " + id);
    }

}
