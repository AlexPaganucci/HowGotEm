package it.alexpaganucci.howgotem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.alexpaganucci.howgotem.entities.PaypalDataResponse;

@Repository
public interface PaypalRepository extends JpaRepository<PaypalDataResponse, Long>{

}
