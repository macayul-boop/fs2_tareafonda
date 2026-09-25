function Header({onClick1, onCLick2}){
    return(
        <header className="max-w-2xl mx-auto mt-5">
            <h1 className="text-center text-2xl font-semibold">Fonda San Belarmino</h1>
            <p className="text-center">Control de bebidas y ventas</p>
            <nav className="w-full flex justify-center mt-8">
                <ul className="flex gap-5">
                    <li onClick={onClick1} className="cursor-pointer">Bebida</li>
                    <li onClick={onCLick2} className="cursor-pointer">Venta</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;