import { useEffect, useState } from "react"
import FormularioVenta from "./FormularioVenta"
import Venta from "./Venta"
import { registrarVenta, listarVentas } from "../services/api" 

function VistaVenta(){

    const [listaVenta, setListaVenta] = useState([])

    useEffect(()=>{

        listarVentas()
            .then((data) => {
                setListaVenta(data)
            })
            .catch((err)=> console.error("Hay un error en la carga inical de los datos en vista venta: ", err))
    }, [])

    // Agregar una venta
    const agregarVenta = async (datos) =>{
        try {
            const ventaGuardada = await registrarVenta(datos);
            setListaVenta([...listaVenta, ventaGuardada])
        } catch (error) {
            console.error("Hay un error en vista venta: ", error)
        }
    }

    return(
        <section className="max-w-3xl mt-10 mx-auto">
            <section className="w-full shadow-sm p-4 rounded-2xl">
                <section>
                    <FormularioVenta onGuardar={agregarVenta}/>
                </section>
                <div className="w-full h-10 mt-10 bg-[#9d72e5] text-white grid grid-cols-4 font-semibold px-2">
                    <p className="flex items-center">Nombre</p>
                    <p className="flex items-center">Unidades</p>
                    <p className="flex items-center">Total</p>
                </div>
                <div>
                    {listaVenta.map((value)=>(
                        <Venta
                            key={value.id}
                            id={value.id}
                            nombreBebida={value.nombreBebida}
                            unidad={value.unidades}
                            total={value.total}
                        />
                    ))}
                </div>
            </section>
        </section>
    )
}

export default VistaVenta