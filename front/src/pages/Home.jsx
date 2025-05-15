import { useEffect, useState, useRef } from 'react';
import  GetProducts from '../Api.jsx'
import 'react-multi-carousel/lib/styles.css';
import Marcas from '../components/Home/Marcas.jsx';
import Cards from '../components/CardsProducts/Cards.jsx';
import ImageGallery from '../components/Home/ImageGallery.jsx';
import GeneroGallery from '../components/Home/GeneroGallery.jsx';
import Galeria from '../components/Home/CategoriesGallery.jsx';
import { Link } from 'react-router-dom';
import InfoExtra from '../components/Home/InfoExtra.jsx';
import LazyComponent from '../components/LazyComponent.jsx';



const Home = () => {
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

export default Home;

