package it.alexpaganucci.howgotem.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "SHOES")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Shoe {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;
	@Column(name="MODEL", nullable=false)
	private String model;
	@Column(name="SKU_CODE", nullable=false)
	private String skuCode;
	@Column(name="BRAND", nullable=false)
	private String brand;
	@Column(name="COLOR", nullable=false)
	private String color;
	@OneToMany(mappedBy = "shoe", cascade = CascadeType.REMOVE)
	@JsonManagedReference
	List<Size> sizes = new ArrayList<>();
	@Column(name="URL_IMG", nullable=false)
	private String urlImg;
	
	public Shoe(String model, String skuCode, String brand, String color, String urlImg) {
		this.model = model;
		this.skuCode = skuCode;
		this.brand = brand;
		this.color = color;
		this.urlImg = urlImg;
	}
}
