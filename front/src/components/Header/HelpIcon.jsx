import { useState } from "react";
import { Link } from "react-router-dom";

const HelpIcon = ({rightOrleft}) => {
    const[isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <a href="#" onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)} 
            className="relative text-[9px] decoration-0 text-white flex flex-col items-center p-[5px]">
                <i className={`bi bi-question-circle text-[40px]`}></i>
                Ayuda
            </a>
            {isOpen && (
                <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className={`absolute z-1300 flex flex-col ${rightOrleft } bg-gray-600 text-white font-medium shadow-lg rounded-lg p-3 gap-1 text-[13px]`}>
                    <Link><i className="bi bi-whatsapp"></i>+543416721106</Link>
                    <Link><i className="bi bi-envelope-at icon"></i> sportdigital@gmail.com</Link>
                </div>
            )}

        </div>

    )
}

export default HelpIcon;