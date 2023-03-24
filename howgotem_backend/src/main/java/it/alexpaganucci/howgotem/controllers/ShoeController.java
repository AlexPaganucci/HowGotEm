package it.alexpaganucci.howgotem.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.alexpaganucci.howgotem.entities.Shoe;
import it.alexpaganucci.howgotem.entities.Size;
import it.alexpaganucci.howgotem.exceptions.ShoeNotFoundException;
import it.alexpaganucci.howgotem.payloads.ShoeDto;
import it.alexpaganucci.howgotem.payloads.SizeDto;
import it.alexpaganucci.howgotem.services.ShoeService;

@RestController
@RequestMapping("/api/shoe")
public class ShoeController {

	@Autowired
	private ShoeService shoeService;

	@PostMapping
	public ResponseEntity<ShoeDto> addShoe(@Valid @RequestBody ShoeDto shoeDto) {
		Shoe shoe = new Shoe(shoeDto.getModel(), shoeDto.getSkuCode(), shoeDto.getBrand(), shoeDto.getColor(),
				shoeDto.getUrlImg());
		List<Size> sizes = new ArrayList<>();
		for (SizeDto sizeDto : shoeDto.getSizes()) {
			Size size = new Size(sizeDto.getSize(), sizeDto.getQuantityAvailable(), sizeDto.getPrice(), shoe);
			sizes.add(size);
		}
		shoe.setSizes(sizes);
		Shoe savedShoe = shoeService.add(shoe);

		ShoeDto savedShoeDto = new ShoeDto();
		savedShoeDto.setModel(savedShoe.getModel());
		savedShoeDto.setSkuCode(savedShoe.getSkuCode());
		savedShoeDto.setBrand(savedShoe.getBrand());
		savedShoeDto.setColor(savedShoe.getColor());
		savedShoeDto.setUrlImg(savedShoe.getUrlImg());
		List<SizeDto> savedSizeDtos = new ArrayList<>();
		for (Size size : savedShoe.getSizes()) {
			SizeDto sizeDto = new SizeDto();
			sizeDto.setSize(size.getSize());
			sizeDto.setQuantityAvailable(size.getQuantityAvailable());
			sizeDto.setPrice(size.getPrice());
			savedSizeDtos.add(sizeDto);
		}
		savedShoeDto.setSizes(savedSizeDtos);

		return ResponseEntity.status(HttpStatus.CREATED).body(savedShoeDto);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteShoe(@PathVariable Long id) {
		Optional<Shoe> optShoe = shoeService.findById(id);

		if (!optShoe.isPresent()) {
			return new ResponseEntity<>("SCARPA NON TROVATA", HttpStatus.NOT_FOUND);
		} else {
			Shoe s = optShoe.get();
			shoeService.delete(s.getId());
		}
		return new ResponseEntity<>(String.format("Scarpa con id %d cancellata!", id), HttpStatus.OK);
	}


	@PutMapping("/{id}")
	public ResponseEntity<Shoe> updateShoe(@PathVariable("id") Long shoeId, @RequestBody ShoeDto shoeDto) {
	    Shoe updatedShoe = shoeService.updateShoeSize(shoeId, shoeDto);
	    if (updatedShoe == null) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	    return ResponseEntity.ok(updatedShoe);
	}

	@GetMapping
	public ResponseEntity<List<Shoe>> getAllShoe() {
		List<Shoe> list = shoeService.findAll();
		if (list.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("{id}")
	public ResponseEntity<Object> findShoeById(@PathVariable("id") Long id) {
		return new ResponseEntity<>(shoeService.findById(id).orElseThrow(() -> new ShoeNotFoundException(id)),
				HttpStatus.OK);
	}

	@GetMapping("/filter_by_part_of_model={m}")
	public ResponseEntity<List<Shoe>> filterShoeByPartOfModel(@PathVariable String m) {
		return new ResponseEntity<>(shoeService.filterShoeByPartOfModel(m), HttpStatus.OK);
	}

	@GetMapping("/filter_by_model={m}")
	public ResponseEntity<List<Shoe>> filterShoeByModel(@PathVariable String m) {
		return new ResponseEntity<>(shoeService.filterShoeByModel(m), HttpStatus.OK);
	}

	@GetMapping("/filter_by_sku_code={s}")
	public ResponseEntity<Optional<Shoe>> filterShoeBySkuCode(@PathVariable String s) {
		return new ResponseEntity<>(shoeService.filterShoeBySkuCode(s), HttpStatus.OK);
	}

	@GetMapping("/filter_by_brand={b}")
	public ResponseEntity<List<Shoe>> filterShoeByBrand(@PathVariable String b) {
		return new ResponseEntity<>(shoeService.filterShoeByBrand(b), HttpStatus.OK);
	}

	@GetMapping("/filter_by_color={c}")
	public ResponseEntity<List<Shoe>> filterShoeByColor(@PathVariable String c) {
		return new ResponseEntity<>(shoeService.filterShoeByColor(c), HttpStatus.OK);
	}

	@GetMapping("/filter_by_size={s}")
	public ResponseEntity<List<Shoe>> filterShoeBySize(@PathVariable double s) {
		return new ResponseEntity<>(shoeService.filterShoeBySize(s), HttpStatus.OK);
	}

	@GetMapping("/filter_by_price={p}")
	public ResponseEntity<List<Shoe>> filterShoeByMaxPrice(@PathVariable double p) {
		return new ResponseEntity<>(shoeService.filterShoeByPrice(p), HttpStatus.OK);
	}
}
