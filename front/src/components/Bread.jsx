import React from "react";
import { Link } from 'react-router-dom';

const Bread = ({ crumbs, flexClass, className }) => {
    const capitalizar = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    console.log(crumbs)
    const filterCrumbs = crumbs.filter(Boolean); // filtramos para evitar que crumbs no tenga valor null o undefined en Categories.jsx
    return (
        <div>
            <ul className={`flex items-center ${flexClass} gap-1 text-gray-400 text-sm leading-tight`}>
                <li className="flex items-center">
                    <Link to='/' className="hover:text-gray-300 transition-colors duration-500">Home</Link>
                    {filterCrumbs.length > 0 && <span className="mx-1">{'>'}</span>}
                </li>

                {filterCrumbs.map((crumb, index) => {
                    const last = index === filterCrumbs.length - 1;

    // Construir la ruta acumulativa
                    const path = '/' + filterCrumbs.slice(0, index + 1).join('/');

                    return (
                        <li key={index} className="flex items-center">
                            {!last ? (
                            <>
                            <Link
                                to={path}
                                className=" hover:text-gray-300 transition-colors duration-500">
                                    {capitalizar(crumb)}
                            </Link>
                        <span className="mx-1">{'>'}</span>
                </>
            ) : (
                <span className={className}>{capitalizar(crumb)}</span>
            )}
        </li>
    );
})}
            </ul>
        </div>
    );
};

export default Bread;