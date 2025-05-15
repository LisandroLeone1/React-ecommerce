import { Link } from "react-router-dom";
import { useState } from "react";
import ToastLogin from "../ToastLogin.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const UserIcon = ({ user, logout, emptyCart }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { showLoginToast} = useAuth(); 

    return (
        <div className="relative">
            <div onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)} 
                className=" cursor-pointer text-[9px] decoration-0 text-white flex flex-col items-center p-[5px]">
                <i className='bi bi-person-fill text-[40px]'></i>
                {user ? (<p>{`¡Hola ${user.username}!`}</p>): 'Mi cuenta'}
            </div>
            {isOpen && (
                                <div onMouseEnter={() => setIsOpen(true)}
                                    onMouseLeave={() => setIsOpen(false)}
                                    className={`absolute z-1300 flex flex-col items-center left-[-17px] bg-gray-600 text-white font-medium shadow-xl rounded-lg p-3 gap-1 text-[13px]`}>
                                    {user ? (
                                        <>
                                            <Link to='/account' className="text-white whitespace-nowrap cursor-pointer hover:text-gray-300 transition duration-300">
                                                Tu cuenta
                                            </Link>
                                            <button onClick={() => {
                                                logout("manual")
                                                emptyCart();
                                                }} 
                                                className="text-white whitespace-nowrap cursor-pointer hover:text-gray-300 transition duration-300">
                                                Cerrar sesión
                                            </button>
                                        </>
                                        
                                    ) : (
                                        <>
                                            <Link to='/login' className="text-white whitespace-nowrap cursor-pointer hover:text-gray-300 transition duration-300">
                                                Iniciar sesión
                                            </Link>
                                            <Link to="/register" className="text-white whitespace-nowrap cursor-pointer hover:text-gray-300 transition duration-300">
                                                Crear cuenta
                                            </Link>
                                        </>
                                    )}
                                    
                                </div>
                            )}
                            {showLoginToast && (
                                    <ToastLogin message="Debés iniciar sesión para agregar productos al carrito" />
                                )}
                        </div>
    );
};

export default UserIcon;