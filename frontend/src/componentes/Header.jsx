function Header({onClick1, onCLick2}){
    return(
        <header className="max-w-2xl mx-auto mt-5">
            <h1 className="text-center text-2xl font-semibold">Fonda San Belarmino</h1>
            <p className="text-center">Control de bebidas y ventas</p>
            <nav>
                <ul>
                    <li onClick={()=> onClick1}>Bebida</li>
                    <li onClick={()=> onClick2}>Venta</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;