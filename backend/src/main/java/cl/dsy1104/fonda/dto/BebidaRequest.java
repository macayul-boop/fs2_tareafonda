package cl.dsy1104.fonda.dto;

import cl.dsy1104.fonda.model.TipoBebida;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BebidaRequest {

    @NotBlank(message = "El atributo 'nombre' es obligatorio")
    private String nombre;

    @NotNull(message = "El atributo 'tipo de bebida' es obligatorio")
    private TipoBebida tipoBebida;

    @NotNull(message = "El atributo 'volumen ml' es obligatorio")
    @Min(value = 100, message = "El rango del atributo 'volumen' debe de estar entre 100 y 3.000 mililitros")
    @Max(value = 3000, message = "El rango del atributo 'volumen' debe de estar entre 100 y 3.000 mililitros")
    private Integer volumenMl;

    @NotNull(message = "El atributo 'stock' es obligatorio")
    @Min(value = 0, message = "El atributo 'stock' debe ser igual o mayor a cero")
    private Integer stock;


    private Double gradosAlcohol;

    private Boolean certificada;

    private Integer azucarPorLitro;

    @NotNull(message = "El atributo 'venta restingida' es obligatorio")
    private Boolean ventaRestringida;


    @AssertTrue(message = "Para tipo ALCOHOLICA, los grados de alcohol deben estar entre 0.5 y 45 y el azúcar debe ser nulo")
    public boolean isValidAlcohol(){
        if(tipoBebida == TipoBebida.ALCOHOLICA){
            return gradosAlcohol != null && gradosAlcohol >= 0.5 && gradosAlcohol <= 45.0 && azucarPorLitro == null;
        }
        return true;
    }

    @AssertTrue(message = "Para tipo SIN_ALCOHOL, el azúcar debe ser >= 0, los grados de alcohol deben ser nulos y la certificacion debe ser nulo")
    public boolean isValidSinAlcohol(){
        if(tipoBebida == TipoBebida.SIN_ALCOHOL){
            return azucarPorLitro != null
                    && azucarPorLitro >= 0
                    && gradosAlcohol == null
                    && certificada == null;
        }
        return true;
    }

}
