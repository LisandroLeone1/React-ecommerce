
const Button = ({label, onClik, type}) => {

    return (
        <button className="w-full mt-15 px[20px] py-[10px]
                                            bg-cuarto cursor-pointer border-none text-white font-medium rounded"
                                            onClick={onClik}
                                            type={type}>
                                                {label}
                                        </button>

    )
}

export default Button;

<button className="w-full mt-15 px[20px] py-[10px]
                                            bg-cuarto cursor-pointer border-none text-white font-medium rounded"
                                            onClick={() => {
                                                actualizarProducto(productoSeleccionado.id, productoSeleccionado.talle, productoSeleccionado.cantidad, nuevoTalle, nuevaCantidad);
                                                setModalOpen(false);
                                                handleLoading(productoSeleccionado.id, nuevoTalle.id);
                                            }}>
                                                Actualizar
                                        </button>


<button className={`w-full mt-1 md:mt-4 px[20px] py-[10px] border-none font-medium rounded 
                            ${cartProducts.length === 0 ? 'cursor-not-allowed bg-septimo text-cuarto' : ' bg-cuarto cursor-pointer text-white' }`}
                            disabled={cartProducts.length === 0}>
                                Comprar
                            </button>

<button className="w-full mt-1 px[20px] py-[10px] bg-quinto cursor-pointer border-none text-cuarto font-medium rounded hidden lg:block">Ver mas productos</button>


<button className="w-full mt-1 md:mt-4 px[20px] py-[10px] bg-cuarto cursor-pointer border-none text-white font-medium rounded"
                        type="submit">
                            Finalizar compra
                    </button>

<button className="w-full px[20px] py-[10px] bg-cuarto cursor-pointer border-none text-white font-medium rounded "
onClick={addProduct}>Agregar al carro</button>