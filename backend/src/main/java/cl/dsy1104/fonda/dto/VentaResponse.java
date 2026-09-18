package cl.dsy1104.fonda.dto;

import cl.dsy1104.fonda.model.EstadoVenta;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VentaResponse {

    private Long id;
    private Long idBebida;
    private String nombreBebida;
    private Integer unidades;
    private int total;
    private EstadoVenta estado;
    private String motivo;
    private LocalDateTime fecha;

}
