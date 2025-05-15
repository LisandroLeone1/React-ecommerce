import React from "react";

const Button = ({ children, onClick, type = "button", disabled = false, fakeDisabled = false, extraClass = "", }) => {

    const baseClasses = "w-full px-[20px] py-[10px] border-none font-medium rounded";

    const colorClasses = disabled || fakeDisabled
    ? "cursor-not-allowed bg-septimo text-cuarto"
    : "cursor-pointer bg-cuarto text-white";

    return (
        <button
        onClick={onClick}
        className={`w-full px-[20px] py-[10px] border-none font-medium rounded ${colorClasses} ${extraClass}`}
        disabled={disabled} // solo si está realmente disabled
        >
            {children}
        </button>
    );
};

export default Button;

