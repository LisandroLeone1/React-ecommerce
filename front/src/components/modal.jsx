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
                className={`absolute flex flex-col right-${right } bg-white shadow-lg rounded-lg p-4 border border-gray-300 text-[13px]`} id="ventana-help">
                    <a href=""><i className={`bi ${ icono2 }`}></i> {texto2}</a>
                    <a href=""><i className={`bi ${ icono3 }`}></i> {texto3}</a>
                </div>
            )}

        </div>

    )
}

export default Modal;