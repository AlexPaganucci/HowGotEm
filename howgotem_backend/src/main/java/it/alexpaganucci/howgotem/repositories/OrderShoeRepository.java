package it.alexpaganucci.howgotem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.alexpaganucci.howgotem.entities.OrderShoe;

@Repository
public interface OrderShoeRepository extends JpaRepository<OrderShoe, Long>{

}
