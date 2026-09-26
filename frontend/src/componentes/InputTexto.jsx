function InputTexto({label, placeholder, value, onChange, error}){
    return(
        <div className="flex flex-col w-full gap-1 text-[#0f172a]">
            <label>{label}</label>
            <input type="text" placeholder={placeholder} value={value == null ? '' : value} onChange={onChange} className={`px-4 py-2 border border-gray-300 rounded-lg focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] focus:outline-none`} />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    )

}

export default InputTexto