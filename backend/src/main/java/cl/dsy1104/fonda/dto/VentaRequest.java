package cl.dsy1104.fonda.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VentaRequest {

    @NotNull(message = "El atributo 'idBebida' es obligatorio")
    private Long idBebida;

    @NotNull(message = "El atributo 'unidades' es obligatorio")
    @Min(value = 1, message = "El atributo 'stock' debe ser igual o mayor a 1")
    private int unidades;

}
