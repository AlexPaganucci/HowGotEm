package it.alexpaganucci.howgotem.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.alexpaganucci.howgotem.entities.Size;

@Repository
public interface SizeRepository extends JpaRepository<Size, Long> {

	@Modifying
	@Query(value = "UPDATE Size s SET s.quantityAvailable = s.quantityAvailable - :quantity WHERE s.shoe.id = :shoeId AND s.id = :sizeId")
	void decreaseQuantity(@Param("shoeId") Long shoeId, @Param("sizeId") Long sizeId, @Param("quantity") int quantity);

	@Query(nativeQuery = true, value = "SELECT * FROM SIZES s WHERE s.SHOE_ID = :shoeId AND s.ID = :sizeId")
	Optional<Size> findByShoeIdAndId(@Param("shoeId") Long shoeId, @Param("sizeId") Long sizeId);

	default Optional<Size> findAndLogByShoeIdAndId(Long shoeId, Long sizeId) {
		Optional<Size> result = findByShoeIdAndId(shoeId, sizeId);
		System.out.println("Query result: " + result.orElse(null));
		return result;
	}
	
	@Query("SELECT DISTINCT s.size FROM Size s")
	List<String> findAllDistinctSize();
}
