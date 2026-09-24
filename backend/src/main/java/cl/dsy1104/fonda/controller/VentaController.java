package cl.dsy1104.fonda.controller;

import cl.dsy1104.fonda.dto.VentaRequest;
import cl.dsy1104.fonda.dto.VentaResponse;
import cl.dsy1104.fonda.service.VentaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/venta")
@RequiredArgsConstructor
public class VentaController {

    private final VentaService ventaService;


    // Leer todas ventas
    @GetMapping
    public ResponseEntity<List<VentaResponse>> listarTodas(){
        List<VentaResponse> listaResponse = ventaService.listarTodas();
        if(listaResponse.isEmpty()) return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        return ResponseEntity.ok(listaResponse);
    }

    // Leer una venta
    @GetMapping("/{idVenta}")
    public ResponseEntity<VentaResponse> listarVentaPorId(@PathVariable Long idVenta){
        VentaResponse response = ventaService.listarVenta(idVenta);
        return ResponseEntity.ok(response);
    }

    // Crear una venta
    @PostMapping
    public ResponseEntity<VentaResponse> crearVenta(
            @RequestBody VentaRequest request
    ){
        VentaResponse response = ventaService.crearVenta(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Eliminar una venta
    @DeleteMapping("/{idVenta}")
    public ResponseEntity<Void> eliminarVenta(@PathVariable Long idVenta){
        ventaService.eliminarVenta(idVenta);
        return ResponseEntity.noContent().build();
    }
}
