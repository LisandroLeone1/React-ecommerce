import { useContext, useState } from "react"
import { useCart } from "./context/CartContext.jsx";
import Contador from "./components/Contador.jsx";
import { Link } from "react-router-dom";


const Cart = () => {
    const [productsCarro, setProductsCarro] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState({});
    const [nuevoTalle, setNuevoTalle] = useState('');
    const [nuevaCantidad, setNuevaCantidad] = useState('');


    const { cartProducts, 
        aumentarCantidad,
        disminuirCantidad, 
        deleteToCart, 
        actualizarProducto,
        calcularTotalConDescuento, 
        cantidadProducts} = useCart();

    console.log(cartProducts);

    const PrecioConDescuento = (precio, descuento, cantidad) => {
            return ((precio - (precio * descuento / 100))* cantidad).toFixed(0);
    };

    const total = calcularTotalConDescuento(cartProducts);

    const abrirModal = (producto) => {
        setProductoSeleccionado(producto);
        setModalOpen(true);
    }
    console.log(`producto seleccionado: ${productoSeleccionado}`);

    return (
        <>
            <div className="w-[90%] mx-auto grid gap-[50px] mt-4 grid-cols-1 md:grid-cols-[minmax(500px,800px)_350px]">
                    <div className="w-[90%] m-auto">
                        {cartProducts.map((product, index) => (
                            <div className=" bg-white p-3 mb-8">
                                <div className="flex items-center gap-5 py-2 border-b border-gray-300">
                                    <div>
                                        <img src={product.imagen} alt="" className="w-[180px] h-[140px]" />
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div>
                                            <h3 key={index} className="font-bold leading-tight">{product.nombre}</h3>
                                            <h4 className="leading-tight text-[13px] font-medium mb-2">{product.marca}</h4>
                                            <h5 className="text-[11px] text-gray-500">Color: {product.color}</h5>
                                            <h5 className="text-[11px]  text-gray-500">Talle: {product.talle}</h5>
                                            <div className="text-cuarto text-[13px] font-bold mt-3">
                                                <Link onClick={() => abrirModal(product)} className="mr-4 cursor-pointer underline">Modificar</Link>
                                                <button className="cursor-pointer underline" onClick={() => deleteToCart(product.id, product.talle, product.color)}>Eliminar</button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col mt-4">
                                            <div className="h-[35px] flex justify-between items-center w-[70px] p-2 border border-[#ccc] rounded-[10px]">
                                                <button onClick={() => disminuirCantidad(product.id)}
                                                    className={`font-bold text-[19px] ${product.cantidad > 1 ? 'cursor-pointer text-cuarto' : 'text-gray-500'}`}
                                                    > - </button>
                                                    {product.cantidad}
                                                <button onClick={() => aumentarCantidad(product.id)}
                                                    className={`font-bold text-[19px] ${product.cantidad >= product.stock ? 'text-gray-500' : 'cursor-pointer text-cuarto'}`}
                                                    > + </button>
                                            </div>
                                        <div className="mt-3">
                                            {product.stock > 5 ? 
                                                <h4 className=" text-gray-500 text-[11px]">+ 5 disponibles</h4> : 
                                                <h4 className=" text-gray-500 text-[11px]">{product.stock} disponobles</h4>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col leading-tight mt-4"> 
                                        {product.descuento > 0 ? (
                                        <div className="flex gap-1 items-center"> 
                                            <span className="text-tercero text-[11px] font-medium">{product.descuento}%</span>
                                            <h3 className="line-through text-gray-600 text-[13px]">${product.precio * product.cantidad}</h3>
                                        </div>
                                        
                                        ): ''}
                                        <h2 className="font-medium text-[20px]">${PrecioConDescuento(product.precio, product.descuento, product.cantidad)}</h2>
                                    </div>                
                                </div>
                            </div>
                            <div class="py-1 px-2">
                                <div class="flex justify-between">
                                    <h5 className="font-normal">Envio</h5>
                                    <h4 className="text-tercero font-bold">Gratis</h4>
                                </div>
                                <Link className="text-cuarto font-medium text-[14px] decoration-0 cursor-pointer ">Ver mas productos<i class="bi bi-chevron-right"></i></Link>
                            </div>
                            

                            </div>
                        ))}
                    </div>

                                                {/* MODAL */}
                                                {modalOpen ? (
                                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-90 z-50 flex items-center justify-center">
                                        <div className="bg-white rounded-xl  w-[90%] max-w-[700px] grid grid-cols-2 h-[470px]">
                                            <div className="bg-sexto">
                                                <div className="p-8">
                                                <img src={productoSeleccionado.imagen} alt="" />
                                                <h2 className="mt-4 font-medium text-[17px] text-gray-500">{productoSeleccionado.nombre}</h2>
                                                <h3 className="mt-4 text-[17px] font-medium">${productoSeleccionado.precio}</h3>
                                                </div>
                                            </div>
                                            <div className="p-8">
                                                <div className="flex justify-between">
                                                    <h2 className="font-bold">Elegi los detalles del producto</h2>
                                                    <button className="text-cuarto cursor-pointer font-bold text-[17px] hover:text-quinto" onClick={() => setModalOpen(!modalOpen)}><i class="bi bi-x-lg"></i></button>
                                                </div>
                                                <h3 className="mt-7 ">
                                                    Color: <span className="font-medium">{productoSeleccionado.color}</span>
                                                </h3>
                                                <div className="w-[100%] mt-10">
                                                    <label htmlFor="talle" className="block mb-1 text-gray-700 text-[12px]">Talle</label>
                                                    <select name="talle" className="w-full p-3 border border-gray-400 rounded text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-cuarto focus:border-transparent transition duration-200"
                                                    value={nuevoTalle} onChange={(e) => setNuevoTalle(e.target.value)}> 
                                                        <option value="" disabled>
                                                            {productoSeleccionado.talle}
                                                        </option>
                                                        {productoSeleccionado.tallesDisponibles.map((talle) => (
                                                        <option key={talle.id} value={talle.nombre} className="p-1">
                                                            {talle.nombre}
                                                        </option> ))}
                                                    </select>
                                                </div>
                                                <div className="w-full mt-10">
                                                    <label htmlFor="talle" className="block mb-1 text-gray-700 text-[12px]">Cantidad</label>
                                                    <select name="cantidad" className="w-full p-3 border border-gray-400 rounded text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-cuarto focus:border-transparent transition duration-200"
                                                    value={nuevaCantidad} onChange={(e) => setNuevaCantidad(e.target.value)}>
                                                        <option value="" disabled>
                                                            {productoSeleccionado.cantidad}
                                                        </option>
                                                            {[...Array(productoSeleccionado.stock)].map((_, i) => (
                                                        <option key={i + 1} value={i + 1}>
                                                            {i + 1}
                                                        </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button className="w-full mt-12 px[20px] py-[10px]
                                                    bg-cuarto cursor-pointer border-none text-white font-medium rounded"
                                                    onClick={() => {
                                                        actualizarProducto(productoSeleccionado.id, productoSeleccionado.talle, productoSeleccionado.cantidad ,nuevoTalle, nuevaCantidad);
                                                        setModalOpen(false);
                                                    }}>
                                                    Actualizar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ): ''}

                    <div className="p-3 bg-white rounded fixed bottom-0 right-0 w-full md:h-[320px] md:sticky md:top-10  ">
                        <div className="font-bold text-center text-[18px] p-2 border-b border-gray-400 hidden md:block">
                            <h3>Resumen de compra</h3>
                        </div>
                        <div className="flex justify-between mt-4 text-gray-600 text-[15px]">  
                                <p>Productos {`(${cantidadProducts})`}</p>
                                <p>${total}</p>
                        </div>
                        <div className="flex justify-between mt-1">
                            <p className="text-gray-600 text-[15px]">Envios</p>
                            <p className="font-medium text-tercero">Gratis</p>
                        </div>
                        <Link className="text-cuarto font-medium text-[14px] cursor-pointer underline mt-3">Seguir comprando</Link>
                        <div className="flex justify-between mt-2 md:mt-6">
                            <p className="font-bold text-[20px]">Total</p>
                            <p className="font-bold text-[20px]">${total}</p>
                        </div>
                        <button className="w-full mt-1 md:mt-4 px[20px] py-[10px] bg-cuarto cursor-pointer border-none text-white font-medium rounded">Comprar</button>
                        <button className="w-full mt-1 px[20px] py-[10px] bg-quinto cursor-pointer border-none text-cuarto font-medium rounded hidden md:block">Ver mas productos</button>
                    </div>
            </div>

        </>
    )

}

export default Cart;