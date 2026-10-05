import { useState, useEffect} from "react"

import InputTexto from "./InputTexto"
import InputRadio from "./InputRadio"

function FormularioBebida({onGuardar, bebidaEditar, cancelarEditar}){

    const [nombre, setNombre] = useState('')
    const [stock, setStock] = useState('')
    const [volumenMl, setVolumenMl] = useState('')
    const [ventaRestringuida, setVentaRestringuida] = useState(null)
    const [tipoBebida, setTipoBebida] = useState('')
    const [azucar, setAzucar] = useState('')
    const [gradosAlcohol, setGradosAlcohol] = useState('')
    const [certificada, setCertificada] = useState(null)
    const [errores, setErrores] = useState({})

    useEffect(()=>{
        if(bebidaEditar){
            setNombre(bebidaEditar.nombre)
            setStock(bebidaEditar.stock)
            setVolumenMl(bebidaEditar.volumenMl)
            setVentaRestringuida(bebidaEditar.ventaRestringida)
            setTipoBebida(bebidaEditar.tipoBebida)
            setAzucar(bebidaEditar.azucarPorLitro)
            setGradosAlcohol(bebidaEditar.gradosAlcohol)
            setCertificada(bebidaEditar.certificada)
        }
    }, [bebidaEditar])

    const submit = (e)=>{
        e.preventDefault()

        let nuevosErrores = {}

        // Validacion nombre
        if(nombre.trim().length === 0){
            nuevosErrores.nombre = 'El nombre es obligatorio';
        }

        // Validacion stock
        const stockConvertido = Number(stock);

        if(String(stock).trim().length === 0){
            nuevosErrores.stock = 'El stock es obligatorio';
        }else if (Number.isNaN(stockConvertido)){
            nuevosErrores.stock = 'Ingresa un numero valido';
        }else if(stockConvertido < 0){
            nuevosErrores.stock = 'El stock debe ser mayor o igual a cero';
        }
            
        // Validacion volumen
        const volumenMlConvertido = Number(volumenMl);

        if(String(volumenMl).trim().length === 0){
            nuevosErrores.volumenMl = 'El volumen es obligatorio';
        }else if(Number.isNaN(volumenMlConvertido)){
            nuevosErrores.volumenMl = 'Ingrese un numero valido';
        }else if(volumenMlConvertido < 300 || volumenMlConvertido > 3000){
            nuevosErrores.volumenMl = 'El rango del volumen es entre 300 y 3000 ml';
        }

        // Validacion venta restringuida
        if(ventaRestringuida == null){
            nuevosErrores.ventaRestringuida = 'Selecciona una opcion';
        }

        // Validacion tipo bebida
        if(tipoBebida != 'ALCOHOLICA' && tipoBebida != 'SIN_ALCOHOL'){
            nuevosErrores.tipoBebida = 'Selecciona el tipo de bebida';
        }


        let bebida = {
            "id": bebidaEditar ? bebidaEditar.id : null,
            "nombre": nombre,
            "tipoBebida": tipoBebida,
            "volumenMl": volumenMlConvertido,
            "stock": stockConvertido,
            "gradosAlcohol": null,
            "certificada": null,
            "azucarPorLitro": null,
            "ventaRestringida": ventaRestringuida
        }

        if(tipoBebida == 'ALCOHOLICA'){            
            // Validacion grados de alcohol
            const gradosAlcholConvertido = Number(gradosAlcohol);

            if(String(gradosAlcohol).trim().length === 0){
                nuevosErrores.gradosAlcohol = 'Los grados de alchol es obligaotrio';
            }else if(gradosAlcholConvertido < 0.5 && gradosAlcholConvertido > 45){
                nuevosErrores.gradosAlcohol = 'Los grados de alchol deben estar entre 0.5 y 45';
            }

            // Validacion de certifiacado
            if(certificada == null){
                nuevosErrores.certificada = 'Selecciona una opcion';
            }

            bebida.gradosAlcohol = gradosAlcholConvertido
            bebida.certificada = certificada


        }else if(tipoBebida == 'SIN_ALCOHOL'){
            // Validacion azucar
            const azucarConvertida = Number(azucar);

            if(String(azucar).trim().length === 0){
                nuevosErrores.azucar = 'La azucar es obligatoria';
            }else if(Number.isNaN(azucarConvertida)){
                nuevosErrores.azucar = 'Ingresa un valor valido';
            }else if(azucarConvertida < 0){
                nuevosErrores.azucar = 'El azucar debe ser mayor o igual a 0'
            }

            bebida.azucarPorLitro = azucarConvertida;
        }

        setErrores(nuevosErrores)

        if(Object.keys(nuevosErrores).length === 0){
            console.log("Se guardo con exito")
            onGuardar(bebida)
            console.log(bebida)

            setNombre('')
            setStock('')
            setVolumenMl('')
            setVentaRestringuida(null)
            setTipoBebida('')
            setAzucar('')
            setGradosAlcohol('')
            setCertificada(null)
        }else{
            console.log("Hay un error")
            console.log(nuevosErrores)
        }
    
    }

    const cancelar = ()=>{
        cancelarEditar()

        setNombre('')
        setStock('')
        setVolumenMl('')
        setVentaRestringuida(null)
        setTipoBebida('')
        setAzucar('')
        setGradosAlcohol('')
        setCertificada(null)
    }

    return(
        <form className="max-w-2xl mx-auto shadow-sm p-4 rounded-2xl">
            <h2 className="text-[#0f172a] text-lg text-center">
                {bebidaEditar ? 'Editar Bebida': 'Crear Bebida'}
            </h2>
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                    <InputTexto label={"Nombre"} value={nombre} placeholder={"nombre"} onChange={(e) => setNombre(e.target.value)} error={errores.nombre}/>
                    <InputTexto label={"Stock"} value={stock} placeholder={"0"} onChange={(e) => setStock(e.target.value)} error={errores.stock}/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                    <InputTexto label={"Volumen ML"} value={volumenMl} placeholder={"300"} onChange={(e) => setVolumenMl(e.target.value)} error={errores.volumenMl}/>
                    <InputRadio label={"Venta restringuida"} value={ventaRestringuida} nombre={"ventaRestringuida"} label1={"Si"} label2={"No"} onChange1={()=> setVentaRestringuida(true)} onChange2={()=> setVentaRestringuida(false)} error={errores.ventaRestringuida}/>
                </div>
                <div className="mb-2.5">
                    <label>Tipo Bebida</label>
                    <select value={tipoBebida} onChange={(e)=> setTipoBebida(e.target.value)} className="w-full border border-gray-300 rounded-lg  focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] focus:outline-none px-4 py-2" name="tipoBebida">
                        <option value="">Sin seleccionar</option>
                        <option value="ALCOHOLICA">Alcoholica</option>
                        <option value="SIN_ALCOHOL">Sin alcohol</option>
                    </select>
                    {errores.tipoBebida && <span className="text-red-500 text-sm">{errores.tipoBebida}</span>}
                </div>

                {tipoBebida === 'ALCOHOLICA' &&
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                        <InputTexto label={"Grados alcohol"} value={gradosAlcohol} placeholder={"0.5"} onChange={(e) => setGradosAlcohol(e.target.value)} error={errores.gradosAlcohol}/>
                        <InputRadio label={"Certificada"} value={certificada} nombre={"certificacion"} label1={"Si"} label2={"No"} onChange1={()=> setCertificada(true)} onChange2={()=> setCertificada(false)} error={errores.certificada}/>
                    </div>
                }
                
                {tipoBebida === 'SIN_ALCOHOL' &&
                    <div>
                        <InputTexto label={"Azucar"} value={azucar} placeholder={"0"} onChange={(e) => setAzucar(e.target.value)} error={errores.azucar}/>
                    </div>
                }
            </div>
            <div className="flex justify-end gap-3 mt-5">
                {bebidaEditar && 
                    <button onClick={(e)=> cancelar()} className="px-4 py-2 bg-gray-200 text-[#0f172a] font-semibold rounded-lg">
                        Cancelar
                    </button>
                }
                <button onClick={(e)=> submit(e)} className="px-4 py-2 bg-[#2563eb] text-white font-semibold rounded-lg">
                    {bebidaEditar ? 'Editar Bebida' :'Guardar Bebida'}
                </button>
            </div>
        </form>
    )
}

export default FormularioBebida