package it.alexpaganucci.howgotem.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "USERS", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="EMAIL", unique = true)
	@NotBlank
	@Email
	private String email;
	@Column(name="NAME")
	private String name;
	@Column(name="SURNAME")
	private String surname;
	@Column(name="PASSWORD")
	@NotBlank
	private String password;
	@ManyToMany
	@JoinTable(name = "USER_ROLES", joinColumns = @JoinColumn(name = "USER_ID"), inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))
	private Set<Role> roles = new HashSet<>();
	@Column(name="ADDRESS")
	@NotBlank
	private String address;
	@Column(name="CITY")
	@NotBlank
	private String city;
	@Column(name="POSTAL_CODE")
	@NotBlank
	private String postalCode;
	@OneToMany(mappedBy = "user")
	@Column(name="ORDERS_ID")
	@JsonManagedReference
	private List<Order> orders;
	@Temporal(TemporalType.DATE)
	@Column(name="BIRTHDATE")
	private Date birthdate;
	@Column(name="SPEDITION_ADDRESS")
	private String speditionAddress;
	@Column(name="SPEDITION_CITY")
	private String speditionCity;
	@Column(name="SPEDITION_POSTAL_CODE")
	private String speditionPostalCode;
	
	
	public User(String email, String name, String surname, String password, String address, String city, String postalCode, Date birthdate) {
		this.email = email;
		this.name = name;
		this.surname = surname;
		this.password = password;
		this.address = address;
		this.city = city;
		this.postalCode = postalCode;
		this.birthdate = birthdate;
	}

}
