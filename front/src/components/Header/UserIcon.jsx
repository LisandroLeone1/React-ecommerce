import { Link } from "react-router-dom";
import { useState } from "react";

const UserIcon = ({ user, logout, emptyCart, absoluteClass}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
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
                                    className={`absolute z-1300 flex flex-col ${absoluteClass} bg-gray-600 text-white font-medium shadow-xl rounded-lg p-3 gap-1 text-[13px]`}>
                                    {user ? (
                                        <>
                                            <Link to='/account' className="text-white cursor-pointer hover:text-gray-300 transition duration-300">
                                                Tu cuenta
                                            </Link>
                                            <button onClick={() => {
                                                logout("manual")
                                                emptyCart();
                                                }} 
                                                className="text-white cursor-pointer hover:text-gray-300 transition duration-300">
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
    );
};

export default UserIcon;