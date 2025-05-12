import { useEffect, useState } from 'react';
import  GetProducts from '../../Api'
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

    console.log('renderizando marcas');

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };
    
        return (
            <div className='bg-septimo flex items-center  justify-center h-[210px] mb-8 mt-20  '>
            <div className='w-[90%] m-auto '>
            <Carousel responsive={responsive}
                  autoPlay={true}
                  autoPlaySpeed={2000}
                  infinite={false}
                itemClass="px-0 m-0">
                    {Marca.map((m) => (
                        <Link key={m.id} to={`/marcas/${m.nombre}`}
                            className='bg-septimo flex items-center justify-center gap-4 h-[160px] w-[170px]'>
                                <img src={m.imagen} alt="" className='h-[130px] w-[160px] opacity-40 hover:opacity-90 transition-opacity duration-300 rounded-md' />            
                        </Link>

                    ))}
            </Carousel>
            </div>
            
        </div>
        )
    };

export default Marcas;