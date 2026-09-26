/**
 * Estructura sugerida de la interfaz. Cada bloque es un componente propio
 * dentro de src/components/:
 *
 *   BebidaList      tabla del catalogo, con filtro por nombre
 *   BebidaForm      alta y edicion de una bebida
 *   VentaForm       registro de una venta
 *   VentaHistorial  listado de ventas con su estado y motivo
 *
 * Ningun componente calcula precios ni decide si una venta se autoriza:
 * esos datos vienen del backend.
 */
import { useState } from 'react';
import Header from './componentes/Header';
import VistaBebida from './componentes/VistaBebida';
import VistaVenta from './componentes/VistaVenta';
import './app.css'

export default function App() {

  const [seccion, setSeccion] = useState('bebida')

  return (
    <div className='w-full h-screen text-[#0f172a]'>
      <Header onClick1={()=> setSeccion('bebida')} onCLick2={()=> setSeccion('venta')} seccionActiva={seccion}/>
      
      <main className='w-full px-5'>
        {seccion === 'bebida' && <VistaBebida/>}
        {seccion === 'venta' && <VistaVenta/>}
      </main>

    </div>
  );
}
