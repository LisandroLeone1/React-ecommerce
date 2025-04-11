import { useEffect, useState } from 'react';
import  GetProducts from '../Api'
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Marcas = () => {
    const [products, setProducts] = useState([]);
    const [Marca, setMarca] = useState([]);


    useEffect(() => {
        GetProducts().then(data => {
            setProducts(data);
    
            const marcasMap = new Map();
    
            data.forEach(p => {
                if (!marcasMap.has(p.marca.nombre)) {
                    marcasMap.set(p.marca.nombre, {
                        nombre: p.marca.nombre,
                        imagen: p.marca.imagen
                    });
                }
            });
    
            setMarca([...marcasMap.values()]);
        });
    }, []);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    
        return (
            <div className='bg-septimo flex items-center  justify-center h-[210px] '>
            <div className='w-[90%] m-auto '>
            <Carousel responsive={responsive}
                itemClass="px-0 m-0">
                    {Marca.map((m) => (
                        <Link to={`/marcas/${m.nombre}`}
                            className='bg-septimo flex items-center justify-center h-[160px] w-[170px]'>
                                <img src={m.imagen} alt="" className='h-[130px] w-[160px] opacity-40 hover:opacity-70 transition-opacity duration-300 rounded-md' />            
                        </Link>

                    ))}
            </Carousel>
            </div>
            
        </div>
        )
    };

export default Marcas;