import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import GetProducts from "./Api.jsx";
import Contador from "./components/Contador.jsx";
import { useCart } from "./context/CartContext.jsx";
import Toast from "./components/Toast.jsx";
import Bread from "./components/Bread.jsx";

const ProductDetail = () => {
    const { id} = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imagenActual, setImagenActual] = useState(null);
    const [VentanaVisible, setVentanaVisible] = useState(false);
    const [colorSeleccionado, setColorSeleccionado] = useState("");
    const [talleSeleccionado, setTalleSeleccionado] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [errorStock, setErrorStock] = useState(false);
    const [errorTalle, setErrorTalle] = useState(false);
    const [errorColor, setErrorColor] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [productoAgregado, setProductoAgregado] = useState(null);
    const [toastError, setToastError] = useState(false);



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await GetProducts(id);
                setProducto(data);
                setLoading(false);
                } catch (error){
                    setError('Error al obtener el producto');
                    console.error("Error", error);
                }
            };
            fetchProduct();
        }, [id]);
    console.log(producto);

    useEffect(() => {
        if(producto) {
            setImagenActual(producto.imagen_principal);
        }
    }, [producto]);

    console.log(colorSeleccionado);
    console.log(talleSeleccionado);

    if (loading) return <p>Cargando producto...</p>;
    if (error) return <p>{error}</p>;
    if (!producto) return <p>Producto no encontrado.</p>;


    const talles = [
        ...producto.talles_indumentaria,
        ...producto.talles_calzado,
        ...producto.talles_accesorios
    ];

    console.log(talles);

    const PrecioEnCuotas = (precio) => {
        return (precio / 3).toFixed(2);
    }
    
    const PrecioConDescuento = (precio, descuento) => {
        return (precio - (precio * descuento / 100)).toFixed(2);
    };

    const { addToCart, cartProducts } = useCart();

    const addProduct = () => {
        let hasError = false;

        if (!colorSeleccionado) {
            setErrorColor(true);
            hasError = true;
        } else {
            setErrorColor(false);
        }

        if (!talleSeleccionado) {
            setErrorTalle(true);
            hasError = true;
        } else {
            setErrorTalle(false);
        }

        if (cantidad > producto.stock) {
            setErrorStock(true);
            hasError=true;
        } else {
            setErrorStock(false);
        }

        if (hasError) return;

        const yaEnCarrito = cartProducts.find(
            (item) =>
                item.id === producto.id &&
                item.talle === talleSeleccionado &&
                item.color === colorSeleccionado
        );

        const nuevoProducto = {
            id: producto.id,
            nombre: producto.nombre,
            marca: producto.marca.nombre,
            precio: producto.precio,
            descuento: producto.descuento,
            stock: producto.stock,
            imagen: producto.imagen_principal,
            color: colorSeleccionado,
            talle: talleSeleccionado,
            cantidad: cantidad,
            tallesDisponibles: talles
        };

        if (yaEnCarrito) {
            setToastError(true);
        } else {
            addToCart(nuevoProducto);
            setToastError(false);
        }
        setShowToast(true);
        setProductoAgregado(nuevoProducto);
        
    };

    const crumbs = [ producto.tipo_producto, producto.genero, producto.nombre];
    console.log(crumbs);

    return (
            <div className="w-[80%]  md:w-[90%] lg:w-[90%] m-auto relative grid md:grid-cols-[3fr_2fr] grid-rows-[auto] justify-center min-h-screen gap-5 py-10 pb-15 box-border">
                <div className="flex flex-col w-full items-center md:items-start lg:flex-row gap-4 mb-10">
                    <div className="flex flex-row lg:flex-col justify-start gap-[29px] lg:gap-[33px]  lg:h-auto">
                    {producto.imagen_principal && (
                            <img src={ producto.imagen_principal} alt="" 
                            className={`w-[90px] h-[80px] lg:min-w-[100px] lg:min-h-[100px]  rounded-lg opacity-70 hover:opacity-100 
                            aspect-[16/9] transition duration-300 ${producto.imagen_principal === imagenActual ? 'opacity-100 shadow-md' : ''}`}
                            onClick={() => setImagenActual(producto.imagen_principal)}></img>
                        )}
                        {producto.imagen_secundaria_1 && (
                            <img src={ producto.imagen_secundaria_1} alt="" 
                            className={`w-[90px] h-[80px] lg:min-w-[100px] lg:min-h-[100px] rounded-lg opacity-70 hover:opacity-100
                            aspect-[16/9] transition duration-300 ${producto.imagen_secundaria_1 === imagenActual ? 'opacity-100 shadow-md' : ''}`} 
                            onClick={() => setImagenActual(producto.imagen_secundaria_1)}></img>
                        )}
                        {producto.imagen_secundaria_2 && (
                        <img src={ producto.imagen_secundaria_2} alt="" 
                        className={`w-[90px] h-[80px] lg:min-w-[100px] lg:min-h-[100px]
                            rounded-lg opacity-70 hover:opacity-100 aspect-[16/9] transition duration-300 ${producto.imagen_secundaria_2 === imagenActual ? 'opacity-100 shadow-md' : ''}`}
                            onClick={() => setImagenActual(producto.imagen_secundaria_2)}></img>
                        )}
                        {producto.imagen_secundaria_3 && (
                        <img src={ producto.imagen_secundaria_3} alt="" 
                        className={`w-[90px] h-[80px] lg:min-w-[100px] lg:min-h-[100px]  rounded-lg opacity-70 
                            hover:opacity-100 aspect-[16/9] transition duration-300 ${producto.imagen_secundaria_3 === imagenActual ? 'opacity-100 shadow-md' : ''}`}  
                            onClick={() => setImagenActual(producto.imagen_secundaria_3)}></img>
                            )}
                    </div>

                    <div className="w-[450px] h-[400px] lg:min-w-[600px] lg:min-h-[500px] overflow-hidden">
                    <img src={imagenActual} alt="" className="w-full h-full rounded-lg object-cover"></img>
                        <h1 className="mt-[20px] mb-[5px]">{producto.nombre}</h1>
                    </div>
                </div>
                <div className="flex flex-col">

                    {producto.estado === "sale" ? (
                        <>
                        <div className="flex justify-between items-center gap-4 mr-1 mb-3">
                            <Bread crumbs={crumbs} flexClass='flex-wrap' className='uppercase text-[14px] font-normal text-gray-400' />
                            <div className="flex justify-center items-center flex-col text-[12px]
                            font-bold text-white min-w-[45px] h-[45px] p-[3px] rounded-full bg-red-500"> 
                                <p>{producto.descuento}%</p>
                                <p>OFF</p>
                            </div>
                        </div>
                        <h4 className="font-medium text-gray-600 text-[18px] uppercase">{producto.marca.nombre}</h4>
                        <h3 className="text-[33px] font-bold uppercase leading-tight">{producto.nombre}</h3>
                        <div className="flex items-center mt-[10px] gap-3">
                            <h5 className="line-through text-gray-600">${producto.precio}</h5>
                            <h5 className="text-[34px] font-normal">${PrecioConDescuento(producto.precio, producto.descuento)}</h5>
                        </div>
                        </>
                    ) : 
                        producto.estado === "novedades" ? (
                        <>
                        <div className="flex justify-between items-center gap-4 mr-1 mb-3">
                            <Bread crumbs={crumbs} flexClass='flex-wrap' className='uppercase text-[14px] font-normal text-gray-400' />
                            <div class="p-1 bg-cuarto text-white text-[12px] font-bold">
                                <p>NUEVO</p>
                            </div>
                        </div>
                        <h4 className="font-medium text-gray-600 text-[18px] uppercase">{producto.marca.nombre}</h4>
                        <h3 className="text-[33px] font-bold uppercase leading-tight">{producto.nombre}</h3>
                        <h5 className="text-[34px] font-normal">${producto.precio}</h5>      
                        </>

                    ) : (
                        <>
                        <div className="mb-3">
                        <Bread crumbs={crumbs} flexClass='flex-wrap' className='uppercase text-[14px] font-normal text-gray-400' />
                        </div>
                        <h4 className="font-medium text-gray-600 text-[18px] uppercase">{producto.marca.nombre}</h4>
                        <h3 className="text-[33px] font-bold uppercase leading-tight">{producto.nombre}</h3>
                        <h5 className="text-[36px] font-normal">${producto.precio}</h5>
                    </>
                    )}

                    <div className="mt-2 ">
                        <p className="mt-3 text-[15px] font-medium text-tercero"><i className="bi bi-cash mr-1"></i> 3 cuotas de ${PrecioEnCuotas(producto.precio)}</p>
                        <div>
                            <p className="mt-3 text-[15px] font-medium text-tercero leading-tight"><i className="bi bi-credit-card-2-back mr-1"></i>10% de descuento</p>
                            <span className="text-[12px] leading-tight block">Pagando con deposito o transferencia</span>
                        </div>
                        
                        <div>
                            <p class="mt-3 text-[15px] font-medium text-tercero leading-tight "> Devolucion gratis</p>
                            <span className="text-[12px] leading-tight  block">Tenes 30 dias desde que lo recibis</span>
                        </div>
                    </div>
                    <div className="mt-5 flex gap-2">
                        <div className="w-full">
                            
                            {errorColor ? (
                            <label htmlFor="color" className="block mb-1 text-[13px] font-medium text-red-500">
                                Color:  <i class="bi bi-exclamation-circle-fill"></i> Elige una opción 
                            </label>
                            )
                            : (
                                <label htmlFor="color" className="block text-gray-600 mb-1 text-[12px]">Color</label>
                            )}
                            <select name="color" id="color" className="w-full p-3 border border-gray-400 rounded text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-cuarto focus:border-transparent transition duration-200"
                            value={colorSeleccionado} onChange={(e) => setColorSeleccionado(e.target.value)}> 
                            <option value="" disabled>Elegí un color</option>
                            {producto.colores.map((color) => (
                                <option key={color.id} value={color.nombre} className="p-1 ">
                                {color.nombre}
                                </option>
                    ))}
                            </select>
                        </div>

                        <div className="w-full">
                        {errorTalle ? (
                            <label htmlFor="color" className="block mb-1 font-medium text-[13px] text-red-500">
                                Talle:  <i class="bi bi-exclamation-circle-fill"></i> Elige una opción 
                            </label>
                            )
                            : (
                                <label htmlFor="talle" className="block text-gray-600 mb-1 text-[12px]">Talle</label>
                            )}
                            <select name="talle" id="talle" className="w-full p-3 border border-gray-400 rounded text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-cuarto focus:border-transparent transition duration-200"
                            value={talleSeleccionado} onChange={(e) => setTalleSeleccionado(e.target.value)}> 
                            <option value="" disabled>Elegí el talle</option>
                                {talles.length > 0 ? (
                                    talles.map((talle) => (
                                    <option key={talle.id} value={talle.nombre} className="p-1">
                                        {talle.nombre}
                                    </option>
                                    ))
                                ): (
                                    <option disabled>No hay talles disponibles</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 ml-4 text-gray-600">
                        {producto.stock >= 5 ? (
                            <p className="text-[11px]">+ 5 disponibles</p>
                        ): (
                            <p className="text-[11px]">{producto.stock} disponibles</p>
                        )}
                    </div>
                    <div className="flex items-center flex-nowrap mt-2 w-full">
                    <Contador
                        value={cantidad}
                        onIncrement={() => setCantidad(c => c + 1)}
                        onDecrement={() => setCantidad(c => Math.max(1, c - 1))}
                        max={producto.stock}
                    />

                        <button className="w-full px[20px] py-[10px] bg-cuarto cursor-pointer border-none text-white font-medium rounded "
                        onClick={addProduct}>Agregar al carro</button>
                    </div>
                    {/* MENSAJE DE ERROR AL AGREGAR PRODUCTO */}
                    {cantidad === producto.stock && (
                    <p className="text-red-500 text-[13px] font-medium mt-2">
                        <i class="bi bi-exclamation-circle-fill mr-2"></i> 
                        Llegaste al maximo de stock para este producto.
                    </p>
                    )}

                    {/* COMPONENTE QUE MUESTRA EL PRODUCTO AGREGADO AL CARRO */}
                    {showToast && productoAgregado && (
                        <Toast producto={productoAgregado} onClose={() => setShowToast(false)} error={toastError} />
                    )}
                    
                    <div className="flex flex-col">
                        <div className="flex gap-2 mt-8 ">
                            <i className="bi bi-house-up"></i>
                            <div>
                                <h5 className="text-[13px] font-normal">Retiro gratis por nuestro locales</h5>
                                <button className="border-none text-[12px] font-bold cursor-pointer"
                                    onClick={() => {setVentanaVisible(!VentanaVisible)}}>
                                    <span className="texto-boton text-cuarto">Ver opciones <i className="bi bi-chevron-down"></i></span>
                                    
                                </button>
                                <div className={`
                                ${VentanaVisible ? 'block p-2 text-[14px] mr-6 mt-1 shadow-[0_0_5px_rgba(1,23,46,0.6)] ': 'hidden'}`}>
                                    <p className="p-2 text-gray-600">Retiro en Local Junin  - Junin 5643 Horario de atención: Lunes a Viernes de 8.30 a 12.30 y 16.30 a 20.30 hs // Sábados de 9 a 13 y 16:30 A 20:30 hs</p>
                                    <p className="p-2 text-gray-600">Retiro en Local Avenida General Paz - Avenida General Paz 660 Horario de atención: Lunes a Sábados de 9 a 13 y 16.00 a 20.00hs</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-2 mt-6">
                            <i class="bi bi-box-seam"></i>
                            <div>
                                <h5 className="text-[13px] font-bold">Envios Gratis</h5>
                                <p className="text-[12px] text-gray-600">Las compras superiores a $ 99..999 tienen ENVIO GRATIS. Si no llegas a ese monto para acceder al beneficio, podés agregar otro producto al carrito o retirar por Nuestros Locales</p>
                            </div>
                        </div>
                        <div class="flex gap-2 mt-6">
                            <i class="bi bi-box-seam"></i>
                            <div>
                                <h5 className="text-[13px] font-bold">Envios</h5>
                                <p className="text-[12px] text-gray-600">Envios por Correo Andrean</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )

}

export default ProductDetail;