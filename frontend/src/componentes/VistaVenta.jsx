import { useEffect, useState } from "react"
import FormularioVenta from "./FormularioVenta"
import Venta from "./Venta"
import DetalleVenta from "./DetalleVenta"
import { registrarVenta, listarVentas } from "../services/api" 

function VistaVenta(){

    const [listaVenta, setListaVenta] = useState([])
    const [verVenta, setVerVenta] = useState([])
    const [error, setError] = useState('')

    useEffect(()=>{
        listarVentas()
            .then((data) => {
                setListaVenta(data || [])
            })
            .catch((err)=> console.error("Hay un error en la carga inical de los datos en vista venta: ", err))
    }, [])

    // Agregar una venta
    const agregarVenta = async (datos) =>{
        try {
            setError('')
            const ventaGuardada = await registrarVenta(datos);
            setListaVenta([...(listaVenta || []), ventaGuardada])
        } catch (error) {
            console.error("Hay un error en vista venta: ", error)
            setError(error.message)
        }
    }

    // Mostrar un venta
    const detalleVenta = (datos)=>{
        const ventaEncontrada = verVenta.find(v => v.id === datos.id)
        if(ventaEncontrada !== undefined) return
        setVerVenta([...verVenta, datos])
    }

    // Ocultar una venta
    const ocultarDetalle = (idVenta)=>{
        const nuevaLista = verVenta.filter(v => v.id !== idVenta);
        setVerVenta(nuevaLista) 
    }

    // Limpiar mensjae error
    const limpiarMensajeError = ()=>{
        setError("")
    }

    return(
        <section className="max-w-3xl mt-10 mx-auto">
            <section className="w-full shadow-sm p-4 rounded-2xl">
                <section>
                    <FormularioVenta onGuardar={agregarVenta} errorBackend={error} limpiarErrorBackend={()=> setError('')}/>
                </section>
                <div className="w-full h-10 mt-10 bg-[#9d72e5] text-white grid grid-cols-4 font-semibold px-2">
                    <p className="flex items-center">Nombre</p>
                    <p className="flex items-center">Unidades</p>
                    <p className="flex items-center">Total</p>
                </div>
                <div>
                    {listaVenta?.map((value, key)=>(
                        <Venta
                            key={key}
                            id={value.id}
                            nombreBebida={value.nombreBebida}
                            unidad={value.unidades}
                            total={value.total}
                            onVer={()=> detalleVenta(value)}
                        />
                    ))}
                </div>
            </section>
            <section className="mt-10 flex flex-col gap-4">
                {verVenta.map((venta) => (
                    <DetalleVenta
                        datos={venta}
                        onOcultar={()=> ocultarDetalle(venta.id)}
                    />
                ))}
            </section>
        </section>
    )
}

export default VistaVenta