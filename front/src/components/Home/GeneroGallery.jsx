
import { Link } from 'react-router-dom';
import hombre from '../../assets/hombre.jpg';
import mujer from '../../assets/mujer.jpg';
import niños from '../../assets/niños.jpg';



const GeneroGallery = () => {
    const imagenes = [
        {
            imagen:  hombre,
            link: 'hombre'
        },
        {
            imagen:  mujer,
            link: 'mujer'
        },
        {
            imagen:  niños,
            link: 'niños'
        },
    ]
    console.log('renderizando generos');

            return (
                <div className='my-15'>
                    <h2 className='text-center font-bold text-[27px] text-gray-500 mb-3 uppercase'>Explora por genero</h2>
                    <div className='flex gap-4'>
                    {imagenes.map((img, index) => (
                        <Link key={index} to={`/Indumentaria/${img.link}`}>
                            <img
                            src={img.imagen}
                            alt={img.link}
                            className="rounded-lg"
                        />
                        </Link>
                    ))}
                </div>
                </div>

            )
}


export default GeneroGallery;