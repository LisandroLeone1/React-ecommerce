
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import nike from '../assets/nike.jpg';
import puma from '../assets/puma.jpg';
import topper from '../assets/topper.jpg';
import fila from '../assets/fila.jpg';
import adidas from '../assets/adidas.jpg';


const ImageGallery = () => {
    const imagenes = [
        {
            imagen:  nike,
            link: 'nike'
        },
        {
            imagen:  adidas,
            link: 'adidas'
        },
        {
            imagen:  fila,
            link: 'fila'
        },
        {
            imagen:  puma,
            link: 'puma'
        },
        {
            imagen:  topper,
            link: 'topper'
        }
    ]
    
        const responsive = {
            superLargeDesktop: {
              // the naming can be any, depends on you.
              breakpoint: { max: 4000, min: 3000 },
              items: 1
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 1
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 1
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          };
        
            return (
                <div className='mb-10'>
<Carousel
  responsive={responsive}
  itemClass="px-0 m-0"
  autoPlay={true}
  autoPlaySpeed={2000}
  infinite={true}
  arrows={true}
>
  {imagenes.map((img, index) => (
    <Link key={index} to={`/marcas/${img.link}`}>
      <img
        src={img.imagen}
        alt={img.link}
        className=""
      />
    </Link>
  ))}
</Carousel>
                </div>
            )
}


export default ImageGallery;