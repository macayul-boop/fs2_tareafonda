import { useState } from "react"
import InputTexto from "./InputTexto"

const listaBebida = [
    {
        "id":1,
        "nombre": "Chicha"
    },
    {
        "id": 2,
        "nombre": "Pisco Sour"
    },
    {
        "id": 3,
        "nombre": "Chicha"
    },
    {
        "id": 4,
        "nombre": "Mote con Huesillo"
    }
]

function FormularioVenta(onGuardar){

    const [bebida, setBebida] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [errores, setErrores] = useState({})

    const limpiarCampos = ()=>{
        setBebida('')
        setCantidad('')
    }

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

            }
            
            limpiarCampos()
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
                        {listaBebida.map((value, key)=>(
                            <option value={value.nombre} key={key}>{value.nombre}</option>
                        ))}
                    </select>
                    {errores.bebida && <span>{errores.bebida}</span>}
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <InputTexto label={"Cantidad"} placeholder={"0"} value={cantidad} onChange={(e) => setCantidad(e.target.value)} error={errores.cantidad}/>
                </div>
            </div>
            <section className="w-full flex justify-between gap-2.5 pt-5">
                <div>

                </div>
                <div className="flex gap-2.5">
                    {
                        (bebida.length !== 0 || cantidad.length !== 0) &&
                        <button onClick={()=> limpiarCampos()} className="px-4 py-2 bg-gray-200 text-[#0f172a] font-semibold rounded-lg">Limpiar</button>
                    }
                    <button className="px-4 py-2 bg-[#2563eb] text-white font-semibold rounded-lg cursor-pointer">Crear</button>
                </div>
            </section>
        </form>
    )
}

export default FormularioVenta