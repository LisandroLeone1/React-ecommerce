import { useState } from "react";
import "./Contador.css";

const Contador = ( {onChangeNumber}) => {
    const [Numero, setNumero] = useState(1);  // Empieza en 1, no en 0
    const [buttonActive, setButtonActive] = useState(false);

    const aumentarNumero = () => {
        const newNumber = Numero + 1;
        setNumero(newNumber);
        onChangeNumber(newNumber);

    }
    const disminuirNumero = () => {
        if (Numero > 1) {
            const newNumber = Numero - 1;
            setNumero(newNumber);
            onChangeNumber(newNumber);
            setButtonActive(true);
        } else {
            setButtonActive(!buttonActive);
        }
    };

    
    return (
            <div className="contador">
                <button className={`boton-contador ${Numero > 1 ? 'text-cuarto cursor-pointer' : 'text-gray-500'}`}
                        onClick={disminuirNumero} >- </button>
                <span className="cantidad">{Numero}</span>
                <button className="text-cuarto cursor-pointer boton-contador" onClick={aumentarNumero}>+</button>
            </div>
    );
};

export default Contador;
