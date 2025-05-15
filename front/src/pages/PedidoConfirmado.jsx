import { useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useParams, useNavigate  } from 'react-router-dom';
import Loader from '../components/Loader';
import { CheckCircle } from 'lucide-react';
import { formatearPrecio } from "../utils/formatPrecio.jsx";


const PedidoConfirmado = () => {
    const { id } = useParams();
    const [pedido, setPedido] = useState();
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPedido = async () => {
            if (!id) return;
            try {
                const response = await fetch(`http://localhost:8000/pedidos/api/pedidos/ver-pedido/${id}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Respuesta del backend:", data);
                    setPedido(data);
                } else {
                    console.error('Error al cargar el pedido');
                }
            } catch (error) {
                console.error("Error al traer el pedido:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPedido();
    }, [id]);

    if (loading) return <Loader />;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
            <div className="flex items-center space-x-4 mb-6">
                <CheckCircle className="text-green-600 w-10 h-10" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">¡Gracias por tu compra!</h1>
                    <p className="text-gray-600">Tu pedido fue procesado exitosamente.</p>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-lg text-gray-700">
                    Número de pedido: <strong className="text-black">#{pedido.id}</strong>
                </p>
                <p className="text-gray-700">
                    Te enviamos un correo a <strong>{pedido.email}</strong> con los detalles.
                </p>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Resumen del pedido</h2>
                <div className="space-y-2">
                    {pedido.items.map((item, index) => (
                        <div key={index} className="p-3 border rounded-lg bg-gray-50">
                            <p className="text-gray-800 font-medium">Producto: {item.producto.nombre}</p>
                            <p className="text-gray-600">Talle: {item.talle.nombre} - Color: {item.color.nombre}</p>
                            <p className="text-gray-600">Cantidad: {item.cantidad}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Datos de envío</h2>
                <p className="text-gray-700">Nombre: {pedido.nombre_completo}</p>
                <p className="text-gray-700">Dirección: {pedido.direccion}, {pedido.ciudad}, {pedido.provincia}, CP {pedido.codigo_postal}</p>
                <p className="text-gray-700">Teléfono: {pedido.telefono}</p>
                <p className="text-gray-700">Tipo de envío: <strong>{pedido.tipo_envio}</strong></p>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <p className="text-lg font-semibold text-black">Total: ${formatearPrecio(pedido.total)}</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-green-600 text-white cursor-pointer rounded-xl hover:bg-green-700 transition"
                >
                    Volver al inicio
                </button>
            </div>
        </div>
    );
};

export default PedidoConfirmado;