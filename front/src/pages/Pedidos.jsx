import { useEffect, useState, useRef } from "react"
import { useCart } from "../context/CartContext.jsx";
import { BiLoaderAlt } from "react-icons/bi";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Input from "../components/Inputs.jsx";

const Pedidos = () => {
    const [metodoEntrega, setMetodoEntrega] = useState("")
    const [formData, setFormData] = useState({
        nombre_completo: "",
        email: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        provincia: "",
        codigo_postal: "",
        metodo_pago: "tarjeta",
        tipo_envio: "",
    });  

    const { cartProducts, 
        setCartProducts,
        emptyCart,
        vaciarCarritoEnBackend,
        calcularTotalConDescuento, 
        cantidadProducts} = useCart();

        const { token } = useAuth();
        const navigate = useNavigate();

    const total = calcularTotalConDescuento(cartProducts);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const SubmitCompra = async (e) => {
        e.preventDefault();

        const items = cartProducts.map(producto => ({
            producto: producto.id,
            cantidad: producto.cantidad,
            color: producto.color.id,
            talle: producto.talle.id,
        }));

        try {
            const response = await fetch("http://localhost:8000/pedidos/api/pedidos/agregar/", {
                method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({ items: items, total: total, ...formData, })
            })

            if (response.ok) {
                const data = await response.json();
                console.log("data que devuelve el backend", JSON.stringify(data));
                const pedidoId=data.pedido.id;
                toast.success("¡Compra realizada con éxito!");
                vaciarCarritoEnBackend();
                navigate(`/pedido-confirmado/${pedidoId}/`);

            } else {
                const data = await response.json();
                console.error("Error en la compra:", data.error);
                Object.entries(data).forEach(([campo, mensaje]) => {
                    toast.error(`${mensaje}`);
                });
                toast.error(data.error);
            }
            
        } catch (error) {
            console.error("Error al enviar el carrito:", error);
        }
    }




    return (
        <>
            <div className="w-[90%] mx-auto flex flex-col items-start lg:flex-row gap-[50px] mt-8 mb-10">
                <div className="flex-1 min-w-[500px] max-w-[800px]">
                    
                    <form className="flex flex-col gap-7"
                        onSubmit={ SubmitCompra}>
                    <h2 className='text-3xl font-bold'>Datos de contacto</h2>
                    <Input
                        labelName="Email"
                        labelValue="email"
                        name="email"
                        type="email"
                        required
                        pattern="\S+@\S+\.\S+"
                        title="Debe ser un email válido"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <h2 className='text-3xl font-bold'>Entrega</h2>
                    <div>
                    <div className={`p-3 rounded flex justify-between mb-1 border ${
                        formData.tipo_envio === "envio" ? "border-2 border-blue-500" : "border-gray-300"}`}>
                        <div>
                            <input
                                type="radio"
                                name="tipo_envio"
                                value="envio"
                                checked={formData.tipo_envio === "envio"}
                                onChange={handleChange}
                            />
                            <span className="ml-4 text-[15px] font-medium">Envío a domicilio</span>
                        </div>
                        <h3 className="font-bold text-gray-500">Gratis</h3>
                    </div>
                    <div className={`p-3 rounded flex justify-between border ${
                        formData.tipo_envio === "retiro" ? "border-2 border-blue-500" : "border-gray-300"}`}>
                        <div>
                            <input
                                type="radio"
                                name="tipo_envio"
                                value="retiro"
                                checked={formData.tipo_envio === "retiro"}
                                onChange={handleChange}
                            />
                            <span className="ml-4 text-[15px] font-medium">Retiro por nuestros locales</span>
                        </div>
                        <h3 className="font-bold text-gray-500">Gratis</h3>
                    </div>
                </div>
                    
                    {formData.tipo_envio === "envio" ? (
                        <>
                    <h2 className='text-3xl font-bold mt-7'>Datos del destinatario</h2>
                    <Input
                        labelName="Nombre completo"
                        labelValue="nombre_completo"
                        name="nombre_completo"
                        type="text"
                        required
                        value={formData.nombre_completo}
                        onChange={handleChange}
                    />

                    <Input
                        labelName="Telofono"
                        labelValue="telefono"
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                    <Input
                        labelName="Provincia"
                        labelValue="provincia"
                        name="provincia"
                        type="text"
                        value={formData.provincia}
                        onChange={handleChange}
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="text-[14px] text-gray-500">Ciudad</label>
                        <input name="ciudad" value={formData.ciudad} onChange={handleChange}
                            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto"
                        />
                    </div>
                    <Input
                        labelName="Codigo postal"
                        labelValue="codigo_postal"
                        name="codigo_postal"
                        type="text"
                        required
                        pattern="^\d{4,10}$"   
                        title="Código postal de 4 a 10 dígitos"
                        value={formData.codigo_postal}
                        onChange={handleChange}
                    />
                    <Input
                        labelName="Direccion"
                        labelValue="direccion"
                        name="direccion"
                        type="text"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                    <Input
                        labelName="Metodo de pago"
                        labelValue="metodo_pago"
                        name="metodo_pago"
                        type="select"
                        value={formData.metodo_pago}
                        onChange={handleChange}
                        required
                        options={[{ label: "Tarjeta de débito", value: "debito" },
                        { label: "Tarjeta de crédito", value: "credito" },
                        { label: "Transferencia bancaria", value: "transferencia" },
                        { label: "Efectivo", value: "efectivo" },]}
                    />
                    <button className="w-full mt-1 md:mt-4 px[20px] py-[10px] bg-cuarto cursor-pointer border-none text-white font-medium rounded"
                        type="submit">
                            Finalizar compra
                    </button>
                        </>
                    ): formData.tipo_envio === "retiro" ? (
                        <>
                        <h2 className='text-md font-bold mt-7'>Datos de la persona que retirara el pedido</h2>
                        <Input
                            labelName="Nombre completo"
                            labelValue="nombre_completo"
                            name="nombre_completo"
                            type="text"
                            required
                            value={formData.nombre_completo}
                            onChange={handleChange}
                        />
                        <Input
                            labelName="Telofono"
                            labelValue="telefono"
                            name="telefono"
                            type="tel"
                            value={formData.telefono}
                            onChange={handleChange}
                        />
                        <button className="w-full mt-1 md:mt-4 px[20px] py-[10px] bg-cuarto cursor-pointer border-none text-white font-medium rounded"
                            type="submit">
                                Finalizar compra
                        </button>
                        </>
                        
                    ): null}
                    </form>
                    
                </div>
                <div className="w-[400px] border border-gray-300 rounded p-2">
                    <div className="border-b border-gray-300 pb-2">
                        {cartProducts.map((product, index) => (
                            <div className="flex justify-between mb-2">
                                <img src={product.imagen_principal} alt="" className="h-[75px] w-[75px]" />
                                    <div>
                                        <h3 className="uppercase text-[13px]">{product.nombre}</h3>
                                        <span className="text-[13px]">x {product.cantidad}</span>
                                    </div>
                                    <h3 className="mt-4 text-[15px]">${product.precio}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 flex flex-col">
                        <div className="flex justify-between">
                            <p className="text-gray-600 text-[15px]">Envios</p>
                            <p className="font-medium text-tercero">Gratis</p>
                        </div>
                        <div className="flex justify-between mt-4">
                            <p className="font-bold text-[20px]">Total</p>
                            <p className="font-bold text-[20px]">${total}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Pedidos;