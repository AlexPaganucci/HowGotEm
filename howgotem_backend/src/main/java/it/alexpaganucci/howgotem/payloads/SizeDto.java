package it.alexpaganucci.howgotem.payloads;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SizeDto {

    private double size;
    private int quantityAvailable;
    private double price;
}
