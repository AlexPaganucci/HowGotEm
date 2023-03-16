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
@Table(name = "ORDERS_SHOES")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class OrderShoe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;
	@ManyToOne
	@JoinColumn(name="SHOE_ID")
	@JsonBackReference
	private Shoe shoe;
	@ManyToOne
	@JoinColumn(name="SIZE_ID")
	@JsonBackReference
	private Size size;
	@Column(name="QUANTITIES")
	private int quantities;
	@ManyToOne
	@JoinColumn(name="ORDER_ID")
	@JsonBackReference
	private Order order;
	
	public OrderShoe (Shoe shoe, Size size, int quantities) {
		this.shoe = shoe;
		this.size = size;
		this.quantities = quantities;
	}
}
