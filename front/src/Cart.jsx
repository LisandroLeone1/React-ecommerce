import { useEffect, useState } from "react"
import { useCart } from "./context/CartContext.jsx";
import Contador from "./components/Contador.jsx";
import { Link } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";



const Cart = () => {
    const [productsCarro, setProductsCarro] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState({});
    const [nuevoTalle, setNuevoTalle] = useState('');
    const [nuevaCantidad, setNuevaCantidad] = useState('');
    const [loadingId, setLoadingId] = useState(null);


    const { cartProducts, 
        aumentarCantidad,
        disminuirCantidad, 
        deleteToCart, 
        actualizarProducto,
        calcularTotalConDescuento, 
        cantidadProducts} = useCart();

    console.log(`productos del carro ${cartProducts}`);

    const PrecioConDescuento = (precio, descuento, cantidad) => {
            return ((precio - (precio * descuento / 100))* cantidad).toFixed(0);
    };

    const total = calcularTotalConDescuento(cartProducts);

    const abrirModal = (producto) => {
        setProductoSeleccionado(producto);
        setModalOpen(true);
    }

    useEffect(() => {
        if (productoSeleccionado) {
            setNuevoTalle(productoSeleccionado.talle);
            setNuevaCantidad(productoSeleccionado.cantidad);
        }
    }, [productoSeleccionado]);
    // cuando le damos click a modificar producto, cambia el productoSeleccionado y se actualizan los talles y cantidad

    console.log(`producto seleccionado: ${productoSeleccionado}`);

    const handleLoading = (id, talle, color) => {
        setLoadingId({ id, talle});
        setTimeout(() => {
            deleteToCart(id, talle, color);
            setLoadingId(null); // Resetear loading después de eliminar
        }, 1000); // Lo que tarde el loader
    };

    return (
        <>
            <div className="w-[90%] mx-auto grid gap-[50px] mt-3 mb-40 lg:mb-4  grid-cols-1 lg:grid-cols-[minmax(500px,800px)_350px]">
                
                    <div className="w-[90%] m-auto">
                        {cartProducts.length > 0 ? (
                            cartProducts.map((product, index) => (
                                <div className=" bg-white p-3 mb-8 relative">
                                {loadingId && loadingId.id === product.id && loadingId.talle === product.talle ? (
                                    <div className=" flex items-center justify-center w-full h-[140px] border-b border-gray-300">
                                        <BiLoaderAlt className="animate-spin text-cuarto text-[30px] " />
                                    </div>
                                    ) : (
                                    <div className="flex lg:items-center gap-5 py-2 border-b border-gray-300">
                                        <div>
                                            <img src={product.imagen} alt="" className="w-[180px] h-[140px]" />
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-between gap-1 w-full">
                                            <div>
                                                <h3 key={index} className="font-bold leading-tight text-[14px]">{product.nombre}</h3>
                                                <h4 className="leading-tight text-[13px] font-medium mb-2">{product.marca}</h4>
                                                <h5 className="text-[11px] text-gray-500">Color: {product.color}</h5>
                                                <h5 className="text-[11px]  text-gray-500">Talle: {product.talle}</h5>
                                                <div className="text-cuarto text-[12px] font-bold mt-3">
                                                    <button onClick={() => abrirModal(product)}
                                                        className="mr-4 cursor-pointer hover:underline">
                                                            Modificar
                                                    </button>
                                                    <button className="cursor-pointer hover:underline mr-4" 
                                                        onClick={() => handleLoading(product.id, product.talle, product.color)}>
                                                            Eliminar
                                                    </button>
                                                    <Link to={`/producto/${product.id}`}
                                                        className="cursor-pointer hover:underline">
                                                            Ver detalle
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="flex flex-col mt-4">

                                                <Contador
                                                    value={product.cantidad}
                                                    onIncrement={() => aumentarCantidad(product.id, product.talle)}
                                                    onDecrement={() => disminuirCantidad(product.id, product.talle)}
                                                    max={product.stock}   
                                                />
                                                <div className="mt-3">
                                                    {product.stock > 5 ? 
                                                        <h4 className=" text-gray-500 text-[11px]">+ 5 disponibles</h4> : 
                                                        <h4 className=" text-gray-500 text-[11px]">{product.stock} disponobles</h4>}
                                                </div>

                                                {product.cantidad === product.stock && (
                                                    <p className="text-red-500 text-[10px] font-medium absolute top-7">
                                                        <i class="bi bi-exclamation-circle-fill mr-2"></i> 
                                                        Stock maximo.
                                                    </p>
                                                )}
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
                                    )}
                                    
                                    <div class="py-1 px-2">
                                        <div class="flex justify-between">
                                            <h5 className="font-normal">Envio</h5>
                                            <h4 className="text-tercero font-bold">Gratis</h4>
                                        </div>
                                        <Link to='/'
                                            className="text-cuarto font-medium text-[14px] decoration-0 cursor-pointer ">
                                            Ver mas productos<i class="bi bi-chevron-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center gap-5 bg-white rounded-lg py-12 border border-gray-200">
                                <i class="bi bi-cart4 text-[80px] font-bold"></i>
                                <div className="">
                                    <h3 className="font-bold text-[18px]">Agregá productos y conseguí envío gratis</h3>
                                    <p className="text-[13px]">Para obtener envío gratis sumá productos de un mismo vendedor.</p>
                                    <Link to='/'
                                    className="text-[13px] font-medium text-cuarto hover:underline">
                                        Descubre productos<i class="bi bi-chevron-right font-medium"></i>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* VENTANA MODAL */}
                    {modalOpen ? (
                        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-90 z-1400 flex items-center justify-center">
                            <div className="bg-white rounded-xl  w-[90%] max-w-[700px] grid grid-cols-2 h-[490px]">
                                <div className="bg-sexto">
                                    <div className="p-8">
                                        <img src={productoSeleccionado.imagen} alt="" />
                                        <h2 className="mt-4 font-normal text-[17px] text-gray-500">{productoSeleccionado.nombre}</h2>
                                        <h3 className="mt-1 mb-3 text-[17px] font-medium">${productoSeleccionado.precio}</h3>
                                        <Link to={`/producto/${productoSeleccionado.id}`}
                                            className="text-cuarto cursor-pointer text-[13px] hover:underline">
                                            Ver todos los detalles del producto
                                        </Link>
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
                                            {productoSeleccionado.tallesDisponibles.map((talle) => (
                                                <option key={talle.id} value={talle.nombre} className="p-1">
                                                    {talle.nombre}
                                                </option> ))}
                                        </select>
                                    </div>
                                    <div className="w-full mt-10">
                                        <label htmlFor="talle" className="block mb-1 text-gray-700 text-[12px]">Cantidad</label>
                                        <select name="cantidad" className="w-full p-3 border border-gray-400 rounded text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-cuarto focus:border-transparent transition duration-200"
                                            value={nuevaCantidad} onChange={(e) => setNuevaCantidad(parseInt(e.target.value))}>
                                            {[...Array(productoSeleccionado.stock)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                        <button className="w-full mt-15 px[20px] py-[10px]
                                            bg-cuarto cursor-pointer border-none text-white font-medium rounded"
                                            onClick={() => {
                                                actualizarProducto(productoSeleccionado.id, productoSeleccionado.talle, productoSeleccionado.cantidad, nuevoTalle, nuevaCantidad);
                                                setModalOpen(false);
                                                handleLoading(productoSeleccionado.id, nuevoTalle);
                                            }}>
                                                Actualizar
                                        </button>
                                            </div>
                                        </div>
                                    </div>
                                ): ''}

                    {/* RESUMEN DE COMPRA */}

                    <div className="p-3 bg-white rounded fixed bottom-0 right-0 w-full lg:h-[330px] lg:sticky lg:top-10  ">
                        <div className="font-bold text-center text-[18px] p-2 border-b border-gray-400 hidden lg:block">
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
                        <Link to='/'
                            className="text-cuarto font-medium text-[14px] cursor-pointer underline mt-3 hidden lg:block">
                                Seguir comprando
                        </Link>
                        <div className="flex justify-between mt-2 md:mt-6">
                            <p className="font-bold text-[20px]">Total</p>
                            <p className="font-bold text-[20px]">${total}</p>
                        </div>
                        <button className="w-full mt-1 md:mt-4 px[20px] py-[10px] bg-cuarto cursor-pointer border-none text-white font-medium rounded">Comprar</button>
                        <button className="w-full mt-1 px[20px] py-[10px] bg-quinto cursor-pointer border-none text-cuarto font-medium rounded hidden lg:block">Ver mas productos</button>
                    </div>
            </div>

        </>
    )

}

export default Cart;