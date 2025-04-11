import Modal from "./modal";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useCart } from "../context/CartContext.jsx";
import Search from "./Search.jsx";


export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const { cantidadProducts } = useCart();

    return (
        <>
            <header>
                <div className="h-[35px] p-[5px] relative bg-gray-600">
                    <div className="flex absolute left-10 top-2 gap-[10px]">
                        <a className="text-white text-[11px]" href="" title="Ir a Instragram"><i className="bi bi-instagram mr-2 text-[14px]"></i>SportDigital</a>
                        <a className="text-white text-[11px]" href="" title="Ir a Instragram"><i className="bi bi-facebook mr-2 text-[14px]"></i>SportDigital</a>
                    </div>
                    <p className="text-white text-[14px] font-normal text-center">Envios por correo Andreani | Todos los productos en 3 cuotas sin interes</p>
                </div>
                <div className="bg-gray-500 h-[80px] flex items-center justify-between px-[40px]">
                    <div className="py-[3px] px-[5px]">
                        <span className="text-3xl text-white font-bold hidden md:block">SportDigital</span>
                    </div>
                    <Search></Search>
                    <div className="hidden md:flex gap-[40px]">
                        <Modal 
                        texto = 'Ayuda'
                        icono = 'bi-question-circle'
                        icono2='bi-whatsapp'
                        icono3='bi-envelope-at icon'
                        texto2='+543416721106'
                        texto3='sportdigital@gmail.com'
                        right='40'
                        />
                        <Modal 
                        texto = 'Mi cuenta'
                        icono = 'bi-person-fill'
                        icono2=''
                        icono3=''
                        texto2='Iniciar sesion'
                        texto3='Crear cuenta'
                        right='20'
                        />
                        <Link to="/cart" 
                                className="relative text-[9px] decoration-0 text-white flex flex-col items-center p-[5px]">
                                <i className="bi bi-cart4 text-[40px]"></i>
                                Mi carrito
                                <span className="p-1 bg-red-500 text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center 
                                absolute right-[0px] top-3">{cantidadProducts}</span>
                        </Link>
                    </div>
                </div>
                <div className="">  
                    <nav className="flex bg-gray-700 border-t border-white">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-[35px] ml-[30px] font-bold cursor-pointer md:hidden"><i class="bi bi-list"></i></button>
                        <ul className= {`${menuOpen ? 'absolute top-43 left-0 w-full bg-gray-800 flex flex-col items-center p-4 space-y-2': 'hidden md:flex justify-center items-center h-[50px]  w-full bg-gray-700 '}`}>
                            <li className="px-5 h-full flex items-center hover:bg-amber-100 font-medium text-white hover:text-gray-700">
                                <Link to="" className="">Inicio</Link>
                            </li>
                            <li className="px-5 h-full flex items-center hover:bg-amber-100 font-medium text-white hover:text-gray-700">
                                <Link to="/Indumentaria" >Indumentaria</Link>
                            </li>
                            <li className="px-5 h-full flex items-center hover:bg-amber-100 font-medium text-white hover:text-gray-700">
                                <Link to="/calzado" >Calzado</Link>
                            </li>
                            <li className="px-5 h-full flex items-center hover:bg-amber-100 font-medium text-white hover:text-gray-700">
                                <Link to="/accesorios">Accesorios</Link>
                            </li>
                            <li className="px-5 h-full flex items-center hover:bg-amber-100 font-medium text-white hover:text-gray-700">
                                <Link to="/marcas">Marcas</Link>
                            </li>
                            <li className="px-5 h-full flex items-center hover:bg-amber-100 font-medium text-white hover:text-gray-700">
                                <Link to="">Contacto</Link>
                            </li>
                            <li className="px-3 border-2 border-white h-[25px] flex items-center hover:bg-red-400 font-medium text-white hover:text-gray-700">
                                <Link to="/sale" >Sale</Link>
                            </li>
                        </ul>

                        <div className="w-full mr-[30px] flex justify-end md:hidden gap-[40px]">
                            <Modal 
                                texto = 'Ayuda'
                                icono = 'bi-question-circle'
                                icono2='bi-whatsapp'
                                icono3='bi-envelope-at icon'
                                texto2='+543416721106'
                                texto3='sportdigital@gmail.com'
                                right='40'
                            />
                            <Modal 
                                texto = 'Mi cuenta'
                                icono = 'bi-person-fill'
                                icono2=''
                                icono3=''
                                texto2='Iniciar sesion'
                                texto3='Crear cuenta'
                                right='20'
                            />
                            <Link to="/cart" 
                                className="relative text-[9px] decoration-0 text-white flex flex-col items-center p-[5px]">
                                <i className="bi bi-cart4 text-[40px]"></i>
                                Mi carrito
                                <span className="p-1 bg-red-500 text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center 
                                absolute right-[0px] top-3">{cantidadProducts}</span>
                            </Link>
                        </div>
                        
                    </nav>
                </div>
            </header> 
        </>
    )
}

export default Header;