import { useState } from "react"

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <div className="">  
            <nav className="flex bg-gray-700 border-t border-white">
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-[35px] ml-[30px] font-bold cursor-pointer md:hidden"><i class="bi bi-list"></i></button>
                <ul className= {`${menuOpen ? 'absolute top-43 left-0 w-full bg-gray-800 flex flex-col items-center p-4 space-y-2': 'hidden md:flex justify-center items-center h-[50px]  w-full bg-gray-700 '}`}>
                    <li className="px-5 h-full flex items-center hover:bg-amber-100 "><a href="">Inicio</a></li>
                    <li className="px-5 h-full flex items-center hover:bg-amber-100"><a href="">Indumentaria</a></li>
                    <li className="px-5 h-full flex items-center hover:bg-amber-100"><a href="">Calzado</a></li>
                    <li className="px-5 h-full flex items-center hover:bg-amber-100"><a href="">Accesorios</a></li>
                    <li className="px-5 h-full flex items-center hover:bg-amber-100"><a href="">Contacto</a></li>
                    <li className="px-3 border-2 border-white h-[25px] flex items-center hover:bg-red-400"><a href="#">Sale!</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;