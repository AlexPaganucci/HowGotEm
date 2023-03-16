package it.alexpaganucci.howgotem.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.alexpaganucci.howgotem.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

	@Query(
			nativeQuery = true,
			value = "SELECT * FROM ORDERS o WHERE o.USER_ID = :id"
			)
	List<Order> filterOrderByUser(@Param("id") Long id);
}
