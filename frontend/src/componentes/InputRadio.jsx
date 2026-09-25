function InputRadio({label, value, nombre, onChange1, label1, onChange2, label2, error}){
    return(
        <div className="flex flex-col w-full justify-center">
            <label>{label}</label>
            <div className="flex gap-20">
                <div className="flex">
                    <input 
                        onChange={onChange1} 
                        value={label1} 
                        type="radio" 
                        name={nombre}
                        checked={value === true}
                    />

                    <label>{label1}</label>
                </div>
                <div className="flex">
                    <input 
                        onChange={onChange2}
                        value={label2} 
                        type="radio" 
                        name={nombre}
                        checked={value === false}
                    />
                    <label>{label2}</label>
                </div>
            </div>
            {error && <span className="text-red-500">{error}</span>}
        </div>
    )
}

export default InputRadio