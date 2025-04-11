import { Link } from "react-router-dom";
import indumentariaImg from '../assets/indumentaria.webp';
import calzadoImg from '../assets/calzado.webp';
import accesoriosImg from '../assets/accesorios.webp';

const categorias = [
  {
    nombre: "Indumentaria",
    imagen: indumentariaImg,
    link: '/indumentaria'
  },
  {
    nombre: "Calzado",
    imagen: calzadoImg,
    link: '/calzado'
  },
  {
    nombre: "Accesorios",
    imagen: accesoriosImg,
    link: '/accesorios'
  }
];

export default function Galeria() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mx-15">
    {categorias.map((cat, index) => (
        <Link
            key={index}
            to={cat.link}
            className="relative h-[370px] rounded-2xl overflow-hidden group shadow-lg text-stone-200 hover:text-white"
        >
            <img
                src={cat.imagen}
                alt={cat.nombre}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-60 transition duration-300 flex flex-col items-center justify-center ">
                <h2 className="text-2xl font-bold uppercase	tracking-wide">{cat.nombre}</h2>
                <span className="mt-2 px-4 py-1 rounded-full border border-white text-[11px] uppercase tracking-wide transition">
                Ingresar
                </span>
            </div>
        </Link>
    ))}
    </div>
  );
}