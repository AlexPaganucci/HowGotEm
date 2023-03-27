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
		    value = "SELECT * FROM SHOES s WHERE LOWER(s.BRAND) IN (:brands)"
		)
	List<Shoe> filterShoesByBrands(@Param("brands") List<String> brands);
	
	@Query(
			  nativeQuery = true,
			  value = "SELECT * FROM SHOES s WHERE LOWER(s.COLOR) LIKE %:color%"
			)
	List<Shoe> filterShoesByColor(@Param("color") String color);
	
	@Query(
			  nativeQuery = true,
			  value = "SELECT DISTINCT s.* FROM SHOES s INNER JOIN SIZES si ON s.ID = si.SHOE_ID WHERE si.SIZE IN (:sizes)"
			)
	List<Shoe> filterShoeBySizes(@Param("sizes") List<Double> sizes);
	
	@Query(
			  nativeQuery = true,
			  value = "SELECT DISTINCT s.* FROM SHOES s INNER JOIN SIZES si ON s.ID = si.SHOE_ID WHERE si.PRICE <= :p"
			)
	List<Shoe> filterShoeByPrice(@Param("p") double p);
	
	@Query("SELECT DISTINCT s.brand FROM Shoe s")
	List<String> findAllDistinctBrands();
	
}
