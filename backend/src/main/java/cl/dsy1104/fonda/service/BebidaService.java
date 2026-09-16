package cl.dsy1104.fonda.service;

import cl.dsy1104.fonda.dto.BebidaRequest;
import cl.dsy1104.fonda.dto.BebidaResponse;
import cl.dsy1104.fonda.exception.NotFoundException;
import cl.dsy1104.fonda.model.Bebida;
import cl.dsy1104.fonda.model.TipoBebida;
import cl.dsy1104.fonda.repository.BebidaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BebidaService {

    private final BebidaRepository bebidaRepository;

    // Leer todas las bebdia
    public List<BebidaResponse> listarTodasBebidas(){
        List<Bebida> listaBebidas = bebidaRepository.findAll();
        List<BebidaResponse> listaDtoBebida = new ArrayList<>();

        for (Bebida b: listaBebidas){
            BebidaResponse bDto = BebidaResponse.builder()
                    .id(b.getId())
                    .nombre(b.getNombre())
                    .tipoBebida(b.getTipoBebida())
                    .volumenMl(b.getVolumenMl())
                    .stock(b.getStock())
                    .gradosAlcohol(b.getGradosAlcohol())
                    .certificada(b.getCertificada())
                    .azucarPorLitro(b.getAzucarPorLitro())
                    .ventaRestringida(b.getVentaRestringida())
                    .build();

            listaDtoBebida.add(bDto);
        }

        return listaDtoBebida;
    }

    // Leer una bebida
    public BebidaResponse leerUnaBebidaPorId(Long idBebida){
        Bebida bebida = bebidaRepository.findById(idBebida)
                .orElseThrow(()-> new NotFoundException("La bebida no existe"));

        return BebidaResponse.builder()
                .id(bebida.getId())
                .nombre(bebida.getNombre())
                .tipoBebida(bebida.getTipoBebida())
                .volumenMl(bebida.getVolumenMl())
                .stock(bebida.getStock())
                .gradosAlcohol(bebida.getGradosAlcohol())
                .certificada(bebida.getCertificada())
                .azucarPorLitro(bebida.getAzucarPorLitro())
                .ventaRestringida(bebida.getVentaRestringida())
                .build();
    }

    // Crear una bebida
    public BebidaResponse crearBebida(BebidaRequest request){

        Double grados = (request.getTipoBebida() == TipoBebida.ALCOHOLICA) ? request.getGradosAlcohol() : null;
        Boolean cert = (request.getTipoBebida() == TipoBebida.ALCOHOLICA) ? request.getCertificada() : null;
        Integer azucar = (request.getTipoBebida() == TipoBebida.SIN_ALCOHOL) ? request.getAzucarPorLitro() : null;

        Bebida bebida = Bebida.builder()
                .nombre(request.getNombre())
                .tipoBebida(request.getTipoBebida())
                .volumenMl(request.getVolumenMl())
                .stock(request.getStock())
                .gradosAlcohol(grados)
                .certificada(cert)
                .azucarPorLitro(azucar)
                .ventaRestringida(request.getVentaRestringida())
                .build();

        Bebida bebidaGuardada = bebidaRepository.save(bebida);

        return BebidaResponse.builder()
                .id(bebidaGuardada.getId())
                .nombre(bebidaGuardada.getNombre())
                .tipoBebida(bebidaGuardada.getTipoBebida())
                .volumenMl(bebidaGuardada.getVolumenMl())
                .stock(bebidaGuardada.getStock())
                .gradosAlcohol(bebidaGuardada.getGradosAlcohol())
                .certificada(bebidaGuardada.getCertificada())
                .azucarPorLitro(bebidaGuardada.getAzucarPorLitro())
                .ventaRestringida(bebidaGuardada.getVentaRestringida())
                .build();
    }

    // Actualizar una bebida
    public BebidaResponse editarBebida(Long idBebida, BebidaRequest request){
        // Validamos que la bebida exista
        Bebida bebida = bebidaRepository.findById(idBebida)
                .orElseThrow(()-> new NotFoundException("La bebida no existe"));

        Double grados = (request.getTipoBebida() == TipoBebida.ALCOHOLICA) ? request.getGradosAlcohol() : null;
        Boolean cert = (request.getTipoBebida() == TipoBebida.ALCOHOLICA) ? request.getCertificada() : null;
        Integer azucar = (request.getTipoBebida() == TipoBebida.SIN_ALCOHOL) ? request.getAzucarPorLitro() : null;


        bebida.setNombre(request.getNombre());
        bebida.setTipoBebida(request.getTipoBebida());
        bebida.setVolumenMl(request.getVolumenMl());
        bebida.setStock(request.getStock());
        bebida.setGradosAlcohol(grados);
        bebida.setCertificada(cert);
        bebida.setAzucarPorLitro(azucar);
        bebida.setVentaRestringida(request.getVentaRestringida());

        Bebida bebidaGuardada = bebidaRepository.save(bebida);

        return BebidaResponse.builder()
                .id(bebidaGuardada.getId())
                .nombre(bebidaGuardada.getNombre())
                .tipoBebida(bebidaGuardada.getTipoBebida())
                .volumenMl(bebidaGuardada.getVolumenMl())
                .stock(bebidaGuardada.getStock())
                .gradosAlcohol(bebidaGuardada.getGradosAlcohol())
                .certificada(bebidaGuardada.getCertificada())
                .azucarPorLitro(bebidaGuardada.getAzucarPorLitro())
                .ventaRestringida(bebidaGuardada.getVentaRestringida())
                .build();
    }

    // Eliminar una bebida
    public void eliminarBebida(Long idBebida){
        // Validamos que si exista la bebida
        if(!bebidaRepository.existsById(idBebida)){
            throw new NotFoundException("La bebida no existe");
        }

        bebidaRepository.deleteById(idBebida);
    }

}
