package cl.dsy1104.fonda.service;

import cl.dsy1104.fonda.dto.BebidaRequest;
import cl.dsy1104.fonda.dto.BebidaCreateResponse;
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
    public List<BebidaCreateResponse> listarTodasBebidas(){
        List<Bebida> listaBebidas = bebidaRepository.findAll();
        List<BebidaCreateResponse> listaDtoBebida = new ArrayList<>();

        for (Bebida b: listaBebidas){
            BebidaCreateResponse bDto = BebidaCreateResponse.builder()
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

    // Crear una bebida
    public BebidaCreateResponse crearBebida(BebidaRequest request){

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

        return BebidaCreateResponse.builder()
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

}
