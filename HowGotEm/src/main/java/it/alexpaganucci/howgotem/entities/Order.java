package it.alexpaganucci.howgotem.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PostPersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "ORDERS")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;
	@ManyToOne
	@JoinColumn(name="USER_ID", nullable=false)
	@JsonBackReference
	private User user;
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	@JsonManagedReference
	List<OrderShoe> shoes = new ArrayList<>();
	@Column(name="TOTAL_PRICE")
	private double totalPrice;
	@Column(name="ORDER_DATE")
	private LocalDate orderDate;
	
	public Order(User user, double totalPrice) {
		this.user = user;
		this.totalPrice = totalPrice;
		this.orderDate = LocalDate.now();
	}
	
    @PostPersist
    public void createOrderShoes() {
        for (OrderShoe shoe : this.shoes) {
            shoe.setOrder(this);
        }
    }
}
