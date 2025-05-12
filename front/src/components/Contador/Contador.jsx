import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Contador = ({ value = 1, onIncrement, onDecrement, min = 1, max = Infinity }) => {
    const [loading, setLoading] = useState(false);

    const handleIncrement = () => {
        if (value < max && !loading) {
            onIncrement();
            setLoading(true);
            setTimeout(() => setLoading(false), 400);
        }
    };

    const handleDecrement = () => {
        if (value > min && !loading) {
            onDecrement();
            setLoading(true);
            setTimeout(() => setLoading(false), 400);
        }
    };


    return (
        <div className="">
            <div className=" flex items-center justify-around mr-5 border border-gray-400 rounded-lg min-w-[100px] max-w-[150px]">
                <button
                    className={`text-[29px] font-medium ${value > min ? 'text-cuarto cursor-pointer' : 'text-gray-500'}`}
                    onClick={handleDecrement}
                    disabled={loading}
                >
                    -
                </button>
                {loading ? (
                    <BiLoaderAlt className="animate-spin text-cuarto text-lg" />
                ) : (
                    <span className="text-[15px]">{value}</span>
                )}
                <button
                    className={`text-[29px] font-medium ${value < max ? 'text-cuarto cursor-pointer' : 'text-gray-500'}`}
                    onClick={handleIncrement}
                    disabled={loading}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default Contador;
