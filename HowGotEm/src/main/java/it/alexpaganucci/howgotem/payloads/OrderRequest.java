package it.alexpaganucci.howgotem.payloads;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderRequest {

    private Long userId;
    private List<OrderShoeRequest> shoes;
}
