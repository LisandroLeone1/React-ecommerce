import { Link } from "react-router-dom";

const Toast = ({ producto, onClose }) => {
    return (
        <div className="fixed top-5 right-5 bg-white shadow-md rounded-xl p-6 border border-gray-300 z-1 animate-slide-in">
            <div className="flex items-center gap-4 ">
                <img src={producto.imagen} alt={producto.nombre} className="w-17 h-17 relative object-cover border-3 border-tercero rounded-full" />
                <i class="bi bi-check-circle-fill absolute top-4 left-20 text-tercero text-[24px] "></i>
                <button onClick={onClose} className="absolute top-3 right-5 text-sm font-bold cursor-pointer text-gray-500 hover:text-gray-300 flex justify-end">✕</button>
                <div>
                    <p className="text-[15px] font-semibold">¡Agregaste el producto al carrito!</p>
                    <p className="text-xs text-gray-500">{producto.nombre}</p>
                </div>
            </div>
            <Link to="/cart"
                className="w-full flex justify-center py-2 font-normal text-[13px] mt-6 text-cuarto bg-quinto cursor-pointer rounded">
                Ver carrito
            </Link>

        </div>

    );
};

    export default Toast;
