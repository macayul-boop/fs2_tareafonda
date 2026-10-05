function DetalleVenta({datos, onOcultar}){
    return(
        <article className="p-4 border border-gray-200 rounded-2xl">
            <section className="flex justify-between">
                <h3 className="font-semibold text-lg text-[#0f172a]">#{datos.id} {datos.nombreBebida}</h3>
                <button onClick={onOcultar} className="p-1.5 flex justify-center items-center bg-gray-400 cursor-pointer rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-600 hover:text-[#0f172a]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </section>
            <section>
                {datos.estado === 'AUTORIZADA' && <span className="px-2 py-0.5 bg-[#f1eafd] text-[#7c3aed] text-sm font-bold rounded-md">Autorizada</span>}
            </section>
            <section>
                <ul>
                    <li>Unidad: {datos.unidades}</li>
                    <li>Total: ${datos.total}</li>
                    <li>Fecha: {datos.fecha}</li>
                </ul>
            </section>
        </article>
    )
}

export default DetalleVenta