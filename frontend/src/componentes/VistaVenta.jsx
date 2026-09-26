import FormularioVenta from "./FormularioVenta"

function VistaVenta(){
    return(
        <section className="max-w-3xl mt-10 mx-auto">
            <section className="w-full shadow-sm p-4 rounded-2xl">
                <section>
                    <FormularioVenta/>
                </section>
            </section>
        </section>
    )
}

export default VistaVenta