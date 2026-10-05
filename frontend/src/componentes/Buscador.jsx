import { useState } from "react"

function Buscador({onBuscar}){

    const [buscador, setBuscador] = useState('')

    const reiniciar = ()=>{
        setBuscador('')
        onBuscar()
    }

    const extraerTexto = (e)=>{
        setBuscador(e.target.value)
        
        console.log(buscador.trim().length)
        if(buscador.trim().length === 1){
            onBuscar()
        }
    }

    const buscar = ()=>{
        if(buscador.trim().length === 0) return
        onBuscar(buscador)
    }

    return(
        <section className="flex items-center gap-5">
            <div className="w-full relative">
                <input value={buscador} onChange={(e) => extraerTexto(e)} type="text" placeholder="Buscador" className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] focus:outline-none"/>
                {buscador && 
                    <button onClick={()=> reiniciar()} className="absolute right-4 top-2 hover:text-[#2563eb] cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                }
            </div>
            <button onClick={()=> buscar()} className="flex items-center gap-1.5 px-2 py-2 bg-[#2563eb] rounded-lg text-white font-semibold cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                Buscar
            </button>
        </section>
    )
}

export default Buscador