package cl.dsy1104.fonda.service;

import cl.dsy1104.fonda.dto.VentaRequest;
import cl.dsy1104.fonda.dto.VentaResponse;
import cl.dsy1104.fonda.exception.ConflictoException;
import cl.dsy1104.fonda.exception.NotFoundException;
import cl.dsy1104.fonda.model.Bebida;
import cl.dsy1104.fonda.model.EstadoVenta;
import cl.dsy1104.fonda.model.TipoBebida;
import cl.dsy1104.fonda.model.Venta;
import cl.dsy1104.fonda.repository.BebidaRepository;
import cl.dsy1104.fonda.repository.VentaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VentaService {

    private final VentaRepository ventaRepository;
    private final BebidaService bebidaService;
    private final BebidaRepository bebidaRepository;

    @Value("${fonda.limite-unidades-por-cliente}")
    private Integer limiteBebidas;

    // Leer todas las ventas
    public List<VentaResponse> listarTodas(){
        List<Venta> listaVentas = ventaRepository.findAll();
        List<VentaResponse> listaResponse = new ArrayList<>();

        for( Venta v : listaVentas){
            VentaResponse response = VentaResponse.builder()
                    .id(v.getId())
                    .idBebida(v.getIdBebida().getId())
                    .total(v.getTotal())
                    .unidades(v.getUnidades())
                    .estado(v.getEstado())
                    .motivo(v.getMotivo())
                    .fecha(v.getFecha())
                    .build();

            listaResponse.add(response);
        }

        return listaResponse;
    }

    // Leer una venta
    public VentaResponse listarVenta(Long idVenta){
        Venta response = ventaRepository.findById(idVenta)
                .orElseThrow(()-> new NotFoundException("La venta no existe"));

        return VentaResponse.builder()
                .id(response.getId())
                .idBebida(response.getIdBebida().getId())
                .total(response.getTotal())
                .unidades(response.getUnidades())
                .estado(response.getEstado())
                .motivo(response.getMotivo())
                .fecha(response.getFecha())
                .build();
    }


    // Crear una venta
    public VentaResponse crearVenta(VentaRequest request){

        // Traemos la bebida
        Bebida bebida = bebidaService.buscarBebida(request.getIdBebida());

        // Validaciones
        if(Boolean.TRUE.equals(bebida.getVentaRestringida())){
            throw new ConflictoException("Venta restringida: la bebida no esta permitida para el comercio");
        }

        if(request.getUnidades() > limiteBebidas){
            throw new ConflictoException("Limite excedido: la cantidad de bebida supera el limite por persona");
        }

        if(request.getUnidades() > bebida.getStock()){
            throw new ConflictoException("Stock insuficiente: la cantidad de bebida supera el stock disponible");
        }

        // Calculo de total
        int precioUnitario;

        if(bebida.getTipoBebida() == TipoBebida.ALCOHOLICA){
            int precioBase = 3500;

            precioUnitario = (Boolean.TRUE.equals(bebida.getCertificada())) ? precioBase : (int) (precioBase * 1.20);
        }else{
            int precioBase = 2000;
            precioUnitario = (bebida.getAzucarPorLitro() > 80) ? (int) (precioBase * 1.10) : precioBase;
        }

        int total = precioUnitario * request.getUnidades();

        // Actualizacion del stock
        bebida.setStock(bebida.getStock() - request.getUnidades());
        bebidaRepository.save(bebida);

        Venta venta = Venta.builder()
                .idBebida(bebida)
                .unidades(request.getUnidades())
                .total(total)
                .estado(EstadoVenta.AUTORIZADA)
                .motivo(null)
                .fecha(LocalDateTime.now())
                .build();

        Venta ventaGuardada = ventaRepository.save(venta);

        return VentaResponse.builder()
                .id(ventaGuardada.getId())
                .idBebida(ventaGuardada.getIdBebida().getId())
                .unidades(ventaGuardada.getUnidades())
                .total(ventaGuardada.getTotal())
                .estado(ventaGuardada.getEstado())
                .motivo(ventaGuardada.getMotivo())
                .fecha(ventaGuardada.getFecha())
                .build();
    }


    // Eliminar una venta
    public void eliminarVenta(Long idVenta){
        if(!ventaRepository.existsById(idVenta)){
            throw new NotFoundException("La venta no existe");
        }
        ventaRepository.deleteById(idVenta);
    }


}
