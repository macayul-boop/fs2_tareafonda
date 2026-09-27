function Venta({id, nombreBebida,unidad, total, onVer}){
    return(
        <div id={id} className="w-full h-10 border-b border-gray-400 grid grid-cols-4 px-2">
            <div className="flex items-center">
                <p>{nombreBebida}</p>
            </div>
            <div className="flex items-center">
                <p>{unidad}</p>
            </div>
            <div className="flex items-center">
                <p>{total}</p>
            </div>
            <div className="flex items-center">
                <button className="cursor-pointer" onClick={onVer}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#2563eb]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>
            </div>
        </div>

    )
}

export default Venta