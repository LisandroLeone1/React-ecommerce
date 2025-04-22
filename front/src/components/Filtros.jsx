import { useState } from "react";

const Filters = ({filterItem, tittle, getCantidad, selectedFilters, HandleChange, colors, cerrarModal}) => {
        const [showAllFilters, setShowAllFilters] = useState(false);
        const showFilters = showAllFilters ? filterItem : filterItem.slice(0, 8);

        const colorClasses = {
            "gray": "text-gray-700",
            "green": "text-green-700",
            "orange": "text-orange-700",
            "red": "text-red-700",
            "purple": "text-purple-700",
            "violet": "text-violet-700",
            "pink": "text-pink-700",
            "beige": "text-blue-700",
            "brown": "text-blue-700",
            "white": "text-white",
            "black": "text-black",
            "yellow": "text-yellow-700",
            "blue": "text-blue-700",
        };
        
            return (
                <>
                <h3 className="font-bold text-[16px] mb-2 mt-[20px]">{tittle}</h3>
                {showFilters.map ((item, index) => {
                    const cantidad = getCantidad(item);
                    // distinguimos si item es un string o un objeto(como en colores) 
                    const nombre = typeof item === 'string' ? item : item.nombre;
                    return (
                        <label key={index} className={`flex justify-between mb-[3px] cursor-pointer   ${selectedFilters.includes(nombre) ? 'text-cuarto font-medium' : 'text-gray-700 hover:text-cuarto' }`}>
                        <div className="flex items-center">
                            <input type="checkbox" name={tittle.toLowerCase()} onChange={(e) => {HandleChange(e);
                                cerrarModal?.();
                            }} 
                                checked={selectedFilters.includes(nombre)}  value={nombre} 
                                className="input-checked mr-2 w-[15px] h-[15px] appearance-none border-2 border-gray-500 hover:border-cuarto  checked:bg-white rounded" />
                            <h5 className="text-[14px] ml-[10px]">{nombre}</h5>
                            <span className="text-[13px] ml-[5px]">({cantidad})</span>
                        </div>
                        {colors === true ? (<i class={`bi bi-circle-fill ${colorClasses[item.style]} mr-6`}></i>) :
                        ''}
                        </label>
                    )
                })}

            {filterItem.length > 8 && (
                <button onClick={() => {setShowAllFilters(prev => !prev)}} 
                className="mt-[7px] px-[8px] py-[4px] text-[13px] text-gray-500 border border-gray-500 hover:border-cuarto hover:text-cuarto cursor-pointer rounded-2xl ">
                    {showAllFilters ? "Ver menos" : "Ver todos"}
                </button>
                )}
            </>
            )
}

export default Filters;