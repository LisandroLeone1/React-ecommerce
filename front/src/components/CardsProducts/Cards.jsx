import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../Button";
import { formatearPrecio } from "../../utils/formatPrecio";

const Cards = ({product, heigth, heightHover}) => {
        const [img, setImg] = useState(0);
        const [buttonVisible, setButtonVisible] = useState(0);


        const PrecioEnCuotas = (precio) => {
            return (precio / 3).toFixed(2);
        }
    

    return (
        <>
            {product.map((producto) => (
            <div key={producto.id}
                onMouseEnter={() => setButtonVisible(producto.id)}
                onMouseLeave={() => setButtonVisible(null)}
                className={`relative rounded-lg border border-gray-300 bg-white overflow-hidden transition-all duration-300 
                ease-in-out hover:shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:z-[1] ${buttonVisible === producto.id ? heigth : heightHover}`
                }>

                <img src={img === producto.id ? producto.imagenes[1]?.imagen : producto.imagenes[0]?.imagen} 
                    onMouseEnter={() => setImg(producto.id)}
                    onMouseLeave={() => setImg(null)}
                    className=""></img>
                <div className="border-t-3 border-gray-500 p-[3px]">
                    <div className="h-[72px] uppercase ">
                        <h4 className='font-normal text-[12px]'>{producto.marca.nombre}</h4>
                        <h3 className='font-bold text-[15px] '>{producto.nombre}</h3>
                    </div>
                    {producto.estado === 'novedades' ? (
                        <div className="bg-blue-500 text-[11px] font-bold text-white w-[50px] p-[2px] text-center absolute top-[10px] left-[10px] uppercase">
                            <p>Nuevo</p>
                        </div>
                    ): producto.estado === 'sale' ? (
                        <div className="flex justify-center items-center flex-col text-[12px] absolute top-[10px] left-[10px]
                        font-bold text-white w-[40px] h-[40px] p-[3px] rounded-full bg-red-500">
                        <p>{producto.descuento}%</p>
                        <p>OFF</p>
                    </div>
                    ) : null}

                    <h5 className="text-[22px] font-normal">${formatearPrecio(producto.precio)}</h5>
                    <div className="flex justify-between items-center">
                        <h6 className='font-medium text-[12px]'>
                            <span className='font-bold'>3 </span>
                                cuotas de  
                            <span className="font-bold">
                                 ${formatearPrecio(PrecioEnCuotas(producto.precio))}
                            </span>
                        </h6>
                        <p className='p-[3px] bg-tercero text-white mr-[5px] text-[10px] font-bold'>Envio gratis</p>
                    </div>
                    <div className="card-footer">
                        <Link to={`/producto/${producto.id}/`}>
                            <Button extraClass="uppercase text-[15px] mt-[15px] font-semibold hover:bg-blue-600 transition-all duration-300 ease-in-out">
                                comprar
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        ))}
        
        </>
        
    )
}

export default Cards;