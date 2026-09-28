import { useState, useEffect } from "react"
import InputTexto from "./InputTexto"
import {listarBebidas} from "../services/api" 

function FormularioVenta({onGuardar, errorBackend, limpiarErrorBackend}){

    const [bebida, setBebida] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [errores, setErrores] = useState({})
    const [listaBebida, setListaBebida] = useState([])

    // Carga inicial de los ventas
    useEffect(()=>{
        listarBebidas()
            .then((data) => setListaBebida(data))
            .catch((err) => console.error("Hubo un error: ", err))
    })

    // Limpiar los campos
    const limpiarCampos = ()=>{
        setBebida('')
        setCantidad('')
        setErrores({})
        limpiarErrorBackend()
    }

    // Crear una venta
    const crearVenta = (e)=>{
        e.preventDefault()
        let nuevosErrores = {}

        // Validar bebida
        if(bebida.trim().length === 0){
            nuevosErrores.bebida = 'Selecciona una bebida'
        }

        // Validar cantidad
        const cantidadConvertida = Number(cantidad);

        if(cantidad.trim().length === 0){
            nuevosErrores.cantidad = 'Ingresa la cantidad de bebida'
        }else if(Number.isNaN(cantidadConvertida)){
            nuevosErrores.cantidad = 'Valor ingresado invalido'
        }

        setErrores(nuevosErrores);

        if(Object.keys(nuevosErrores).length === 0){

            const venta = {
                idBebida: Number(bebida),
                unidades: cantidadConvertida
            }

            onGuardar(venta)
            limpiarCampos()

            console.log(venta)
        }else{
            console.log('Hay errores')
            console.log(nuevosErrores)
        }

    }

    return(
        <form>
            <div className="flex gap-5 flex-col lg:flex-row">
                <div className="flex flex-col gap-1 w-full">
                    <label>Bebida</label>
                    <select value={bebida} onChange={(e)=> setBebida(e.target.value)} className="w-full border border-gray-300 rounded-lg  focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] focus:outline-none px-4 py-2" name="bebida">
                        <option value="">Sin seleccionar</option>
                        {listaBebida.map((value)=>(
                            <option value={value.id} key={value.id}>{value.nombre}</option>
                        ))}
                    </select>
                    {errores.bebida && <span className="text-red-500">{errores.bebida}</span>}
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <InputTexto label={"Cantidad"} placeholder={"0"} value={cantidad} onChange={(e) => setCantidad(e.target.value)} error={errores.cantidad}/>
                </div>
            </div>
            <section className="w-full flex justify-between gap-2.5 pt-5">
                <div>
                    {errorBackend && <span className="text-red-500">{errorBackend}</span>}
                </div>
                <div className="flex gap-2.5">
                    {
                        (bebida.length !== 0 || cantidad.length !== 0) &&
                        <button onClick={()=> limpiarCampos()} className="px-4 py-2 bg-gray-200 text-[#0f172a] font-semibold rounded-lg">Limpiar</button>
                    }
                    <button onClick={(e)=> crearVenta(e)} className="px-4 py-2 bg-[#2563eb] text-white font-semibold rounded-lg cursor-pointer">Crear</button>
                </div>
            </section>
        </form>
    )
}

export default FormularioVenta