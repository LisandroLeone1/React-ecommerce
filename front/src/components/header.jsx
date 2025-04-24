import Modal from "./modal";
import { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { useCart } from "../context/CartContext.jsx";
import Search from "./Search.jsx";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showTopBar, setShowTopBar] = useState(true);
    const[isOpen, setIsOpen] = useState(false);

    const { cantidadProducts } = useCart();
    const { user, logout} = useAuth(); 
    const navigate = useNavigate();

    // funcion para ocultar el primer contenedor del header cuando se hace scroll para abajo
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowTopBar(false);
            } else {
                setShowTopBar(true);
            }
        };

        window.addEventListener('scroll', handleScroll); // si se hace scroll se llama a la funcion HandleScroll
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const Logout = () => {
        logout();
        navigate('/')
    }

    const Navs = ({ path = "", label }) => {
        // normalizo el path: si es '' me devuelve '/', sino la barra
        const fullPath = path === "" ? "/" : `/${path}`;
    
        return (
            <li className=" h-full flex items-center font-medium">
                <NavLink
                    to={fullPath}
                    end // <-- importante para que '/' no se marque como activo en todas las rutas
                    className={({ isActive }) =>
                        `w-full h-full flex items-center transition-colors duration-400 px-5 py-3 ${
                            isActive
                                ? 'bg-white text-gray-700 border-y border-gray-500'
                                : 'text-white hover:bg-white hover:text-gray-700 border-y border-gray-500'
                        }`
                    }
                    onClick={() => {setMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    {label}
                </NavLink>
            </li>
        );
    };

    return (
        <>
        <header className="fixed top-0 left-0 w-full z-1200">
            <div className={`bg-gray-600 relative  transition-all duration-300 ease-in-out hidden md:block
            ${showTopBar ? 'h-[35px] p-[5px]' : 'h-0  p-0'}`}>
    
    <div className={`absolute left-10 top-2 gap-[10px] ${showTopBar ? 'flex' : 'hidden'}`}>
        <a className="text-white text-[11px]" href=""><i className="bi bi-instagram mr-2 text-[14px]"></i>SportDigital</a>
        <a className="text-white text-[11px]" href=""><i className="bi bi-facebook mr-2 text-[14px]"></i>SportDigital</a>
    </div>
    <p className={`text-white text-[14px] font-normal text-center ${showTopBar ? 'block' : 'hidden'}`}>
        Envios por correo Andreani | Todos los productos en 3 cuotas sin interes
    </p>
</div>

                <div className="bg-gray-500 h-[80px] flex items-center justify-between gap-4 px-[40px]">
                    <div className="py-[3px] px-[5px]">
                        <span className="text-3xl text-white font-bold hidden lg:block">SportDigital</span>
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
                        right='-20'
                        />
                        <div>
                            <div onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)} 
                                className="relative cursor-pointer text-[9px] decoration-0 text-white flex flex-col items-center p-[5px]">
                                <i className='bi bi-person-fill text-[40px]'></i>
                                {user ? (<p>{`¡Hola ${user.username}!`}</p>): 'Mi cuenta'}
                            </div>
                            {isOpen && (
                                <div onMouseEnter={() => setIsOpen(true)}
                                    onMouseLeave={() => setIsOpen(false)}
                                    className='absolute z-1300 flex flex-col left-284 bg-gray-600 text-white font-medium shadow-xl rounded-lg p-3 gap-1 text-[13px]'>
                                    {user ? (
                                        <>
                                            <Link to='/account' className="text-white cursor-pointer hover:text-gray-300 transition duration-300">
                                                Tu cuenta
                                            </Link>
                                            <button onClick={Logout} className="text-white cursor-pointer hover:text-gray-300 transition duration-300">
                                                Cerrar sesión
                                            </button>
                                        </>
                                        
                                    ) : (
                                        <>
                                            <Link to='/login' className="text-white cursor-pointer hover:text-gray-300 transition duration-300">
                                                Iniciar sesión
                                            </Link>
                                            <Link to="/register" className="text-white cursor-pointer hover:text-gray-300 transition duration-300">
                                                Crear cuenta
                                            </Link>
                                        </>
                                    )}
                                    
                                </div>
                            )}
                        </div>
                        
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
                    <nav className="flex bg-gray-700 border-t border-white relative">
                        <button onClick={() => setMenuOpen(!menuOpen)} 
                            className="text-[45px] text-white ml-[30px] font-bold cursor-pointer  md:hidden">
                                <i class={`bi bi-list ${menuOpen ? 'border-2 border-white rounded' : ''}`}></i>
                        </button>
                        <ul className= {`${menuOpen ? 
                            'absolute top-21 z-100 left-0 border-y border-white w-full bg-gray-700 flex flex-col'
                            : 'hidden md:flex justify-center items-center h-[50px]  w-full bg-gray-700 '}`}>
                            <Navs path='' label="Inicio" />
                            <Navs path='Indumentaria' label="Indumentaria" />
                            <Navs path='calzado' label="Calzado" />
                            <Navs path='accesorios' label="Accesorios" />
                            <Navs path='marcas' label="Marcas" />
                            <Navs path='' label="Contacto" />
                            <Navs path='sale' label="Sale" />
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