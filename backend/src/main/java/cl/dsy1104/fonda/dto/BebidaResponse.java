package cl.dsy1104.fonda.dto;

import cl.dsy1104.fonda.model.TipoBebida;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BebidaResponse {
    private Long id;
    private String nombre;
    private TipoBebida tipoBebida;
    private Integer volumenMl;
    private Integer stock;
    private Double gradosAlcohol;
    private Boolean certificada;
    private Integer azucarPorLitro;
    private boolean ventaRestringida;
}
