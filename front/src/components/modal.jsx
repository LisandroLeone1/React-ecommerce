import { useState } from "react";
import { Link } from "react-router-dom";

const Modal = ({icono, texto, icono2, icono3, texto2, texto3, right, showModal = true}) => {
    const[isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <a href="#" onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)} 
            className="relative text-[9px] decoration-0 text-white flex flex-col items-center p-[5px]">
                <i className={`bi ${ icono } text-[40px]`}></i>
                { texto }
            </a>
            {isOpen && showModal && (
                <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className={`absolute z-1300 flex flex-col left-${right } bg-gray-500 text-white font-medium shadow-lg rounded-lg p-3 gap-1 text-[13px]`}>
                    <a href=""><i className={`bi ${ icono2 }`}></i> {texto2}</a>
                    <a href=""><i className={`bi ${ icono3 }`}></i> {texto3}</a>
                </div>
            )}

        </div>

    )
}

export default Modal;