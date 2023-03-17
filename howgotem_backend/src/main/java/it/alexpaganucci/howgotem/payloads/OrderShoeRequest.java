package it.alexpaganucci.howgotem.payloads;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderShoeRequest {

    private Long shoeId;
    private Long sizeId;
    private int quantities;
}
