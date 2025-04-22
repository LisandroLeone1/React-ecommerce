import { useEffect, useState, useRef } from 'react';
import  GetProducts from './Api.jsx'
import 'react-multi-carousel/lib/styles.css';
import Marcas from './components/Marcas.jsx';
import Cards from './components/Cards.jsx';
import ImageGallery from './components/ImageGallery.jsx';
import GeneroGallery from './components/GeneroGallery.jsx';
import Galeria from './components/CategoriesGallery.jsx';
import { Link } from 'react-router-dom';
import InfoExtra from './components/InfoExtra.jsx';
import LazyComponent from './components/LazyComponent';



const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        GetProducts().then(data => setProducts(data));
    }, []);


    const productosSale = products.filter(producto => producto.estado === 'sale');
    const productosNovedades = products.filter(producto => producto.estado === 'novedades');
    const productosDestacados = products.filter(producto => producto.estado === 'destacados');
    

    const ProductList = ({ tittle, productos }) => {
        return (
            <div className=''>
                <h1 className='text-3xl font-bold underline text-gray-500 text-center'>{tittle}</h1>
                <div className="grid justify-center m-5 gap-[30px]  grid-cols-[repeat(auto-fit,_280px)] auto-rows-[410px] mb-4">
                    <Cards product={productos} 
                        heigth='h-[473px]'
                        heightHover='h-[420px]'></Cards>
                </div>            
        </div>
        )
    };


    return (
        <div>
    <ImageGallery />

    <LazyComponent>
        <div className='min-h-[500px]'>
        <ProductList tittle="Novedades" productos={productosNovedades} />
        </div>
        
    </LazyComponent>

    <LazyComponent>
        <Marcas />
    </LazyComponent>

    <LazyComponent>
        <ProductList tittle="Ofertas" productos={productosSale} />
    </LazyComponent>

    <LazyComponent>
        <div className='flex justify-center mt-10 '>
            <Link className="py-2 px-9 font-medium text-gray-500 rounded bg-septimo border-1 border-gray-300 cursor-pointer hover:shadow-lg">
            Ver más
            </Link>
        </div>
    </LazyComponent>

    <LazyComponent>
        <Galeria></Galeria>
    </LazyComponent>

    <LazyComponent>
        <GeneroGallery />
    </LazyComponent>
        <InfoExtra></InfoExtra>
        </div>
    )
};

export default Products;



{/*          
    
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
            </Carousel> */}