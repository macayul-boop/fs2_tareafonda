import { useState, useEffect } from "react"
import FormularioBebida from "./FormularioBebida"
import Bebida from "./Bebida"
import DetalleBebida from "./DetalleBebida"
import Buscador from "./Buscador"
import { listarBebidas, crearBebida, actualizarBebida, eliminarBebidaApi } from "../services/api"

function VistaBebida(){

    const [bebidas, setBebidas] = useState([])
    const [bebidaEditada, setBebidaEditada] = useState(null)
    const [verBebida, setVerBebida] = useState([])

    useEffect(()=>{
        listarBebidas()
            .then((data)=>{
                setBebidas(data || [])
            })
            .catch((err)=> console.error("Hay un error: ", err))
    }, [])    

    // Crear o Editar bebida
    const guardarProducto = async (producto)=>{

        try {
            if(bebidaEditada){
                const bebidaActualizada = await actualizarBebida(producto.id, producto)
                setBebidas(bebidas.map(b => b.id === bebidaActualizada.id ? bebidaActualizada : b))
                setBebidaEditada(null)
            }else{
                const bebidaCreada = await crearBebida(producto)
                setBebidas([...bebidas, bebidaCreada])
            }
        } catch (error) {
            console.error("Ocurrio un error: ", error)
        }
        
    }

    // Cancelar la accion de ediatr
    const cancelarEditar = () => {
        setBebidaEditada(null)
    }

    // Eliminar una bebida
    const eliminarBebida = async (idBebida)=>{
        try {
            await eliminarBebidaApi(idBebida)
            setBebidas(bebidas.filter(b => b.id !== idBebida));
        } catch (error) {
            console.error("Ocurrio un error: ", error)
        }
    }

    const buscarBebida = async(nombreBebida = null)=>{
        try {
            if(nombreBebida != null){
                const listaBebida = await listarBebidas(nombreBebida)
                setBebidas(listaBebida)
            }else{
                const listaBebida = await listarBebidas();
                setBebidas(listaBebida)
            }
        } catch (error) {
            console.log("Hay un error en el metodo buscador: ", error)
        }
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
                <Buscador onBuscar={buscarBebida}/>
                <div className="w-full h-10 mt-5 bg-[#9d72e5] text-white grid grid-cols-4 font-semibold px-2">
                    <p className="flex items-center">Nombre</p>
                    <p className="flex items-center">Tipo bebida</p>
                    <p className="flex items-center">Volumen ml</p>
                </div>
                <div className="">
                    {bebidas?.map((value, key)=>(
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
                        <DetalleBebida key={key} bebida={value} onOcultar={()=> ocultarProducto(value.id)}/>
                    ))}
                </section>
            </section>
            <section>
                
            </section>
        </section>
    )
}

export default VistaBebida