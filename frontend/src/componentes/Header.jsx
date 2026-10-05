function Header({onClick1, onCLick2, seccionActiva}){
    return(
        <header className="max-w-2xl mx-auto pt-5">
            <h1 className="text-center text-2xl font-semibold">Fonda San Belarmino</h1>
            <p className="text-center">Control de bebidas y ventas</p>
            <nav className="w-full flex justify-center mt-8">
                <ul className="flex gap-5">
                    <li 
                        onClick={onClick1} 
                        className={`cursor-pointer ${seccionActiva == 'bebida' ? 'border-b-3 border-[#2563eb]' :'text-[#64748b]'}`}
                    >
                        Bebida
                    </li>
                    <li 
                        onClick={onCLick2} 
                        className={`cursor-pointer ${seccionActiva == 'venta' ? 'border-b-3 border-[#2563eb]' :'text-[#64748b]'}`}
                    >
                        Venta
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;