package it.alexpaganucci.howgotem.payloads;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShoeDto {

    private String model;
    private String skuCode;
    private String brand;
    private String color;
    private List<SizeDto> sizes;
    private String urlImg;
    private String urlImg2;
    private String urlImg3;
    private Boolean bestSeller;
    
}
