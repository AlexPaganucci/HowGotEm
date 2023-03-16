package it.alexpaganucci.howgotem.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "SIZES")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Size {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;
	@Column(name="SIZE")
	private double size;
	@Column(name="QUANTITY_AVAILABLE")
	private int quantityAvailable;
	@Column(name="PRICE")
	private double price;
	@ManyToOne
	@JoinColumn(name="SHOE_ID")
	@JsonBackReference
	private Shoe shoe;
	
	public Size(double size, int quantityAvailable, double price, Shoe shoe) {
		this.size = size;
		this.quantityAvailable = quantityAvailable;
		this.price = price;
		this.shoe = shoe;
	}
}
