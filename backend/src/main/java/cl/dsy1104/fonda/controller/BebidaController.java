package cl.dsy1104.fonda.controller;

import cl.dsy1104.fonda.dto.BebidaRequest;
import cl.dsy1104.fonda.dto.BebidaResponse;
import cl.dsy1104.fonda.service.BebidaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bebida")
@RequiredArgsConstructor
public class BebidaController {

    private final BebidaService bebidaService;

    // Leer todas las bebidas
    @GetMapping
    public ResponseEntity<List<BebidaResponse>> leerTodasBebidas(){
        List<BebidaResponse> listResponse = bebidaService.listarTodasBebidas();
        if(listResponse.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.ok(listResponse);
    }

    // Crear una bebida
    @PostMapping
    public ResponseEntity<BebidaResponse> crearBebida(@Valid @RequestBody BebidaRequest request){
        BebidaResponse response = bebidaService.crearBebida(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Editar una bebida
    @PutMapping("/{idBebida}")
    public ResponseEntity<BebidaResponse> editarBebida(
            @Valid @RequestBody BebidaRequest request,
            @PathVariable Long idBebida
    ){
        BebidaResponse response = bebidaService.editarBebida(idBebida, request);
        return ResponseEntity.ok(response);
    }

    // ELiminar una bebida
    @DeleteMapping("/{idBebida}")
    public ResponseEntity<Void> eliminarBebida(@PathVariable Long idBebida){
        bebidaService.eliminarBebida(idBebida);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

}
