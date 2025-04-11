import GetProducts from "../Api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = () => {
    const[allProducts, setAllProducts] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        GetProducts().then(data => { 
            setProductosFiltrados(data);
            setAllProducts(data);
        });
    }, []);

    const searcher = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value.trim() === "") {
            setProductosFiltrados(allProducts);
        } else {
            const resultadoBusqueda = allProducts.filter((busqueda) =>
                busqueda.nombre.toLowerCase().includes(value.toLowerCase()) ||
                busqueda.marca.nombre.toLowerCase().includes(value.toLowerCase())
            );
            setProductosFiltrados(resultadoBusqueda);
        }
    }

    return (
        <> 
            <div className="flex min-w-[300px] max-w-[650px] flex-grow m-auto relative ">
                <input className="rounded-tl-[8px] rounded-bl-[8px] flex flex-grow p-[11px] border-none bg-white " 
                    type="text" name="busqueda" placeholder="¿Qué estás buscando?" value={search}
                    onChange={searcher}>
                    </input>
                <i className="bi bi-search text-[22px] w-[50px] flex items-center justify-center rounded-tr-[8px] rounded-br-[8px] bg-white"></i>

                {search && search.length > 1 ? (
                <div className="bg-white border border-gray-200 rounded-[8px] hover:shadow-[0_4px_20px_rgba(0,0,0,0.8)] z-50 w-full max-h-[440px] overflow-y-auto absolute top-12 ">
                    <div className="grid grid-cols-2 gap-2 p-2">
                    {productosFiltrados.map((producto) => (
                        <div className="h-[100px] bg-sexto border-b border-r border-gray-300 p-2 hover:shadow-xl transition-shadow duration-200">
                            <Link to={`/producto/${producto.id}/`} onClick={() => setSearch("")} className="flex gap-4 ">
                                <img src={producto.imagen_principal} alt="" className="h-[90px] w-[90px]" />
                                <div className="w-full leading-tight">
                                    <h4 className="uppercase text-[11px] text-gray-600 font-medium">{producto.marca.nombre}</h4>
                                    <h3 className="uppercase text-[13px] font-bold h-[30px]">{producto.nombre}</h3>
                                    <h3 className="mt-2 font-bold text-[15px]">${producto.precio}</h3>
                                    <div className="flex justify-between items-center w-[170px]">
                                        <h5 className="text-gray-500 text-[11px]">3 cuotas de {producto.precio}</h5>
                                        <h6 className="font-bold text-[9px] uppercase">Envio gratis</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

                    </div>

                </div>
            ) : ''}
            </div>



        
        </>
    )

}

export default Search;