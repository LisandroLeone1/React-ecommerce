import { useState } from "react";
import { Link } from "react-router-dom";

const Toast = ({ producto, onClose, error }) => {

    return (
        <div className="fixed inset-0 z-1400 w-full h-full">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="bg-white shadow-md absolute right-0 p-6 border w-100 h-full border-gray-300 z-1500 animate-slide-in flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-7 h-7 rounded-full border border-gray-500 absolute top-3 right-5 flex items-center justify-center ">
                        <button onClick={onClose} 
                            className="text-md font-bold cursor-pointer text-gray-500 hover:text-gray-400 flex justify-end">
                            ✕
                        </button>
                    </div>
                    <img src={producto.imagen_principal} alt={producto.nombre} 
                        className={`w-25 h-25 relative object-cover border-4 ${error ? 'border-red-600' : 'border-tercero'}  rounded-full`} />
                        {error ? (
                        <i className="bi bi-exclamation-triangle-fill absolute top-49 right-37 text-red-600 text-[24px]"></i>
                        ) : (
                        <i className="bi bi-check-circle-fill absolute top-43 right-37 text-tercero text-[24px] "></i>
                        )}
                    <div className="flex flex-col items-center">
                        <p className="text-[17px] font-semibold text-center">
                            {error ? (
                            '¡Ya tenes este producto en tu carro de compras!'
                            ): (
                            '¡Agregaste este producto al carrito!'
                            )}  
                        </p>  
                        <p className="text-[13px] text-gray-500">{producto.nombre}</p>
                        {!error && (
                            <p className="text-tercero mt-7 font-medium">
                                ¡Tenes envio gratis! <span className="text-black font-normal">Aprovecha para sumar mas productos</span>
                            </p>
                        )}

                    </div>
                </div>
                <div className="absolute w-full px-2 top-118">
                    <Link to="/cart"
                        className="w-full flex justify-center mt-1 px[20px] py-[13px] bg-cuarto cursor-pointer border-none text-white font-medium rounded">
                        Ver carrito
                    </Link>
                    <Link to="/"
                        className="w-full flex justify-center mt-1 px[20px] py-[13px] bg-quinto cursor-pointer border-none text-cuarto font-medium rounded">
                        Ver mas productos
                    </Link>
                </div>
            </div>
        </div>

    );
};

    export default Toast;
