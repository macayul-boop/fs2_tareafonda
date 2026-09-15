package cl.dsy1104.fonda.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "bebida")
public class Bebida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_bebida", nullable = false)
    private TipoBebida tipoBebida;

    @Column(name = "volumen_ml", nullable = false)
    private int volumenMl;

    @Column(name = "stock", nullable = false)
    private int stock;

    @Column(name = "grados_alcohol")
    private Double gradosAlcohol;

    @Column(name = "certificada")
    private boolean certificada;

    @Column(name = "azucar_por_litro")
    private Integer azucarPorLitro;

    @Column(name = "venta_restringida", nullable = false)
    private boolean ventaRestringida;

    @OneToMany(mappedBy = "idBebida")
    private List<Venta> ventas = new ArrayList<>();

}
