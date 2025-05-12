import { Link } from "react-router-dom";
import Filters from "../components/Filtros/Filtros";

const Aside = ({
    filtro,
    categorie,
    tipo,
    capitalizar,
    generosUnicos,
    tiposUnicos,
    allFilters,
    selectedFilters,
    HandleChange,
    products,
    cerrarModal,
    }) => {

    return (
    <div>
        {!filtro ? (
            <div className="mb-10 mt-3">
            {categorie !== "marcas" ? (
            // si no hay filtro(genero) y categoria no es igual a marcas muestro solo los generos a elegir
            <>
                <h3 className="text-[22px] font-bold mb-[10px]">Género</h3>
                {generosUnicos.map((generos) => (
                    <ul key={generos}>
                        <li className="mb-1">
                        <Link
                        to={`/${categorie}/${generos}`}
                        className="text-[15px] font-normal text-gray-600 hover:text-gray-400"
                        onClick={cerrarModal && cerrarModal}
                        >
                            {capitalizar(generos)}
                        </Link>
                    </li>
                    </ul>
                ))}
            </>
            ) : (
                // si categoria es igual a marca muestro las marcas
            <>
                <h3 className="text-[22px] font-bold mb-[10px]">Marcas</h3>
                {allFilters.marcas.map((marca) => (
                <ul key={marca}>
                    <li className="mb-1">
                        <Link
                        to={`/marcas/${marca}`}
                        className="text-[15px] font-normal text-gray-600 hover:text-gray-400"
                        onClick={cerrarModal && cerrarModal}
                        >
                            {marca}
                        </Link>
                    </li>
                </ul>
                ))}
            </>
            )}
            </div>
        ) : !tipo ? (
        // cuando hay filtro pero no hay tipo muestro los tipos de productos(remeras, camisetas, buzos, etc.)
            <div className="mb-10 mt-3">
                <Link
                    to={`/${categorie}/`}
                    className="text-[13px] flex items-center mb-[30px] text-gray-400"
                >
                    <i className="bi bi-caret-left"></i>
                    <span className="text-[14px] leading-none">
                        {capitalizar(categorie)}
                    </span>
                </Link>
                <h3 className="text-[22px] font-bold mb-[10px]">{capitalizar(filtro)}</h3>
                {tiposUnicos.map((tipo) => (
                    <ul key={tipo}>
                        <li className="mb-1">
                            <Link
                                to={`/${categorie}/${filtro}/${tipo}`}
                                className="text-[15px] font-normal text-gray-600 hover:text-gray-400"
                                onClick={cerrarModal && cerrarModal}
                            >
                                {capitalizar(tipo)}
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>
        ) : (
        // cuando hay tipo solo muestro el link para volver a la categoria/genero anterior
        <div>
            <Link
                to={`/${categorie}/${filtro}`}
                className="text-[13px] flex items-center mt-3 mb-[30px] text-gray-400"
            >
                <i className="bi bi-caret-left"></i>
                <span className="text-[14px] leading-none">
                {capitalizar(filtro)}
                </span>
            </Link>
            <h3 className="text-[22px] font-bold mb-[10px]">Filtrar Por</h3>
        </div>
        )}

        <Filters
            filterItem={allFilters.colores}
            tittle="Color"
            getCantidad={(color) =>
                products.filter((p) =>
                p.colores.some((c) => c.nombre === color.nombre)
            ).length
            }
            selectedFilters={selectedFilters}
            HandleChange={HandleChange}
            colors={true}
            cerrarModal={cerrarModal}
        />

        <Filters
            filterItem={allFilters.marcas}
            tittle="Marcas"
            getCantidad={(marca) =>
            products.filter((p) => p.marca.nombre === marca).length
            }
            selectedFilters={selectedFilters}
            HandleChange={HandleChange}
            cerrarModal={cerrarModal}
        />

        <Filters
            filterItem={allFilters.talles}
            tittle="Talles"
            getCantidad={(talle) =>
                products.filter((producto) =>
                producto.talles.some((t) => t.nombre === talle)
            ).length
            }
            selectedFilters={selectedFilters}
            HandleChange={HandleChange}
            cerrarModal={cerrarModal}
        />
    </div>
    );
};

export default Aside;