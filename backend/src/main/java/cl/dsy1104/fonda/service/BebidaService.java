package cl.dsy1104.fonda.service;

import cl.dsy1104.fonda.dto.BebidaResponse;
import cl.dsy1104.fonda.model.Bebida;
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

}
