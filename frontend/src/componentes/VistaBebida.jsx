import { useState } from "react"
import FormularioBebida from "./FormularioBebida"
import Bebida from "./Bebida"

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

    const guardarProducto = (producto)=>{
        if(bebidaEditada){
            setBebidas(bebidas.map(b => b.id === producto.id ? producto : b))
            setBebidaEditada(null)
        }else{
            setBebidas([...bebidas, producto])
        }
    }

    const cancelarEditar = () => {
        setBebidaEditada(null)
    }

    return(
        <section className="max-w-6xl mt-5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            <section>
                <p className="text-center">Parte Izquierda</p>
                <FormularioBebida onGuardar={guardarProducto} bebidaEditar={bebidaEditada} cancelarEditar={cancelarEditar}/>
            </section>
            <section>
                <p className="text-center">Parte Derecha</p>
                <div className="w-full h-10 mt-10 bg-gray-200 grid grid-cols-4 font-semibold">
                    <p>Nombre</p>
                    <p>Tipo bebida</p>
                    <p>Volumen ml</p>
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
                        />
                    ))}
                </div>
            </section>
        </section>
    )
}

export default VistaBebida