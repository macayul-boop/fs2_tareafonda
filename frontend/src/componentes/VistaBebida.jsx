import { useState } from "react"
import FormularioBebida from "./FormularioBebida"
import Bebida from "./Bebida"
import DetalleBebida from "./DetalleBebida"

const productosIniciales = [
    {
        "id": 1,
        "nombre": "Chicha",
        "tipoBebida": "ALCOHOLICA",
        "volumenMl": 1000,
        "stock": 40,
        "gradosAlcohol": 12.0,
        "certificada": false,
        "azucarPorLitro": null,
        "ventaRestringida": true
    },
    {
        "id": 2,
        "nombre": "Pisco Sour",
        "tipoBebida": "ALCOHOLICA",
        "volumenMl": 500,
        "stock": 25,
        "gradosAlcohol": 18.0,
        "certificada": true,
        "azucarPorLitro": null,
        "ventaRestringida": false
    },
    {
        "id": 3,
        "nombre": "Chicha",
        "tipoBebida": "SIN_ALCOHOL",
        "volumenMl": 1000,
        "stock": 60,
        "gradosAlcohol": null,
        "certificada": null,
        "azucarPorLitro": 95,
        "ventaRestringida": false
    },
    {
        "id": 4,
        "nombre": "Mote con Huesillo",
        "tipoBebida": "SIN_ALCOHOL",
        "volumenMl": 400,
        "stock": 50,
        "gradosAlcohol": null,
        "certificada": null,
        "azucarPorLitro": 70,
        "ventaRestringida": false
    }
]

function VistaBebida(){

    const [bebidas, setBebidas] = useState(productosIniciales)
    const [bebidaEditada, setBebidaEditada] = useState(null)
    const [verBebida, setVerBebida] = useState([])

    // Crear o Editar bebida
    const guardarProducto = (producto)=>{
        if(bebidaEditada){
            setBebidas(bebidas.map(b => b.id === producto.id ? producto : b))
            setBebidaEditada(null)
        }else{
            setBebidas([...bebidas, producto])
        }
    }

    // Cancelar la accion de ediatr
    const cancelarEditar = () => {
        setBebidaEditada(null)
    }

    // Eliminar una bebida
    const eliminarBebida = (idBebida)=>{
        setBebidas(bebidas.filter(b => b.id !== idBebida));
    }

    // Mostrar los detalles de una bebida
    const detalleProducto = (producto) =>{
        const productoExiste = verBebida.find(p => p.id === producto.id)
        if(productoExiste !== undefined) return
        setVerBebida([...verBebida, producto])
    }

    // Ocultar los detalles de una bebida
    const ocultarProducto = (idProducto) =>{
        const nuevoLista = verBebida.filter( b => b.id !== idProducto);
        setVerBebida(nuevoLista)
    }

    return(
        <section className="max-w-7xl mt-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            <section className="bg-white">
                <FormularioBebida onGuardar={guardarProducto} bebidaEditar={bebidaEditada} cancelarEditar={cancelarEditar}/>
            </section>
            <section className="shadow-sm p-4 rounded-2xl">
                <div className="w-full h-10 mt-10 bg-[#9d72e5] text-white grid grid-cols-4 font-semibold px-2">
                    <p className="flex items-center">Nombre</p>
                    <p className="flex items-center">Tipo bebida</p>
                    <p className="flex items-center">Volumen ml</p>
                </div>
                <div className="">
                    {bebidas.map((value, key)=>(
                        <Bebida 
                            key={key} 
                            id={value.id} 
                            nombre={value.nombre} 
                            tipo={value.tipoBebida} 
                            volumen={value.volumenMl}  
                            onEditar={()=> setBebidaEditada(value)}
                            onVer={()=> detalleProducto(value)}
                            onEliminar={()=> eliminarBebida(value.id)}
                        />
                    ))}
                </div>
                <section className="mt-10 flex flex-col gap-4">
                    {verBebida.map((value, key)=>(
                        <DetalleBebida bebida={value} key={key} onOcultar={()=> ocultarProducto(value.id)}/>
                    ))}
                </section>
            </section>
        </section>
    )
}

export default VistaBebida