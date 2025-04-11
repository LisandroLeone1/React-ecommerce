import { useEffect, useState } from 'react';
import  GetProducts from './Api.jsx'
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Marcas from './components/Marcas.jsx';
import Galeria from './components/CategoriesGallery.jsx';






const Products = () => {
    const [products, setProducts] = useState([]);
    const [img, setImg] = useState(0);
    const [buttonVisible, setButtonVisible] = useState(0);

    useEffect(() => {
        GetProducts().then(data => setProducts(data));
    }, []);

    const productosSale = products.filter(producto => producto.estado === 'sale');
    const productosNovedades = products.filter(producto => producto.estado === 'novedades');
    const productosDestacados = products.filter(producto => producto.estado === 'destacados');

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    

    const ProductList = ({ tittle, productos }) => {
        return (
            <div className='h-[1000px]'>
                <Galeria></Galeria>
                <Marcas></Marcas>
            <h1 className='text-3xl font-bold underline text-center text-gray-400 mt-[30px]'>{tittle}</h1>
            <div className='w-[90%] m-auto'>
            <Carousel responsive={responsive}
                itemClass="px-0 m-1">
            {productos.map((producto) => (
                <div key={producto.id}

                className={`relative w-[300px] rounded-lg border border-gray-300 bg-white overflow-hidden transition-all duration-300 
                ease-in-out hover:shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:z-[1] ${buttonVisible === producto.id ? 'h-[464px]' : 'h-[415px]'}`
                }>

                    <img src={producto.imagen_principal} 
                        className=""></img>
                    <div className="border-t-4 border-gray-500 p-[3px]">
                        <div className="h-[80px] uppercase ">
                            <h4 className='font-normal text-[13px]'>{producto.marca.nombre}</h4>
                            <h3 className='font-bold text-[15px] '>{producto.nombre}</h3>
                        </div>
                        <div className="bg-blue-500 text-[11px] font-bold text-white w-[50px] p-[2px] text-center absolute top-[10px] left-[10px] uppercase">
                            <p>Nuevo</p>
                        </div>
                        <h5 className="precio__total">${producto.precio}</h5>
                        <div className="flex justify-between items-center">
                            <h6 className='font-medium text-[12px]'><span className='font-bold'>3</span> cuotas de <span>$20000</span></h6>
                            <p className='p-[3px] bg-tercero text-white mr-[5px] text-[10px] font-bold'>Envio gratis</p>
                        </div>
                        <div className="card-footer">
                            <button className="w-full p-[10px] bg-blue-500 text-white mt-[15px] rounded-md border-none text-[15px] uppercase font-semibold hover:bg-blue-600 transition-all duration-300 ease-in-out" ><a href="">comprar</a></button>
                        </div>
                    </div>
                </div>
            ))}
            </Carousel>
            </div>
            
        </div>
        )
    };


    return (
        <div>
            <ProductList tittle="Ofertas" productos={productosSale} />
        </div>
    )
};

export default Products;