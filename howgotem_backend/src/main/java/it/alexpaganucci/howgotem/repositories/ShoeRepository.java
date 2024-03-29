package it.alexpaganucci.howgotem.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.alexpaganucci.howgotem.entities.Shoe;

@Repository
public interface ShoeRepository extends JpaRepository<Shoe, Long>{
	
	@Query(
			nativeQuery = true,
			value = "SELECT * FROM SHOES s WHERE LOWER(s.MODEL) LIKE CONCAT('%', LOWER(:m), '%')"
			)
	List<Shoe> filterShoeByPartOfModel(@Param("m") String m);
	
	@Query(
			nativeQuery = true,
			value = "SELECT * FROM SHOES s WHERE LOWER(s.MODEL) = LOWER(:m)"
			)
	List<Shoe> filterShoeByModel(@Param("m") String m);
	
	@Query(
			nativeQuery = true,
			value = "SELECT * FROM SHOES s WHERE s.SKU_CODE = :s"
			)
	Optional<Shoe> filterShoeBySkuCode(@Param("s") String s);
	
	@Query(
			nativeQuery = true,
			value = "SELECT * FROM SHOES s WHERE s.BEST_SELLER = true"
			)
	List<Shoe> filterBestSellerShoe();
	
	@Query("SELECT DISTINCT s.brand FROM Shoe s")
	List<String> findAllDistinctBrands();
	
}
