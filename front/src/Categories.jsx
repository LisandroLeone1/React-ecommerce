import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetProducts from "./Api.jsx";
import Breadcrumbs from "./components/Breadcrumbs.jsx";
import { Link } from "react-router-dom";
import Cards from "./components/Cards.jsx";

const CategoriaPage = () => {
    const { categorie, filtro } = useParams();


    const [products, setProducts] = useState([]); //guardo los productos
    const [allProducts, setAllProducts] = useState([]); 
    const [allFilters, setAllFilters] = useState({ // obtengo los filtros
        colores: [],
        generos: [],
        marcas: [],
        talles: [],
    });
    const [selectedFilters, setSelectedFilters] = useState([]); // estado para guardar los filtros seleccionados
    const [showAllFilters, setShowAllFilters] = useState(false);
    const [order, setOrder] = useState("");

    // filtro los productos segun su categoria o si esta en estado 'sale'
    useEffect(() => {
        GetProducts().then((data) => {
            let filteredProducts = data;

            if (categorie === "sale") {
              filteredProducts = filteredProducts.filter(p => p.estado === "sale");
            } else if (categorie === "marcas") {
              if (filtro) {
                filteredProducts = filteredProducts.filter(
                  p => p.marca.nombre.toLowerCase() === filtro.toLowerCase()
                );
              }
            } else {
              filteredProducts = filteredProducts.filter(
                p => p.tipo_producto.toLowerCase() === categorie.toLowerCase()
              );
            }
            
            // Aplicar filtro por género si existe (en cualquier caso)
            if (filtro && categorie !== "marcas") {
              filteredProducts = filteredProducts.filter(
                p => p.genero.toLowerCase() === filtro.toLowerCase()
              );
            }
        
            setProducts(filteredProducts);
            setAllProducts(filteredProducts);

            const colores = new Set();
            const marcas = new Set();
            const generos = new Set();
            const talles = new Set(); // Un único Set para todos los talles
            
            // obtengo todos los colores, marcas y generos disponibles
            filteredProducts.forEach(producto => {
                producto.colores.forEach(color => colores.add(color.nombre));
                marcas.add(producto.marca.nombre);
                generos.add(producto.genero);
                producto.talles_indumentaria?.forEach(talle => talles.add(talle.nombre));
                producto.talles_calzado?.forEach(talle => talles.add(talle.nombre));
                producto.talles_accesorios?.forEach(talle => talles.add(talle.nombre));
            });
            // las guardo como array en allFilters
            setAllFilters({
                colores: [...colores], 
                generos: [...generos],
                marcas: [...marcas],
                talles: [...talles],
            });

            // reseteao los filtros al cambiar de categoria
            setSelectedFilters([]);
        });
    }, [categorie, filtro]);

    const HandleChange = (event) => {
        const { value, checked } = event.target;
        // si esta el checkbox esta checked guardo el valor en selectdFilters
        const updatedselected = checked ? [...selectedFilters, value] : selectedFilters.filter((o) => o !== value);
        setSelectedFilters(updatedselected);
    };

    const HandleOrderChange = (event) => {
        let orderProducts = [...products];
        if (event === "precioAsc") {
            orderProducts=[...orderProducts].sort((a, b) => a.precio - b.precio);
        }
        else if (event === "precioDesc") {
            orderProducts=[...orderProducts].sort((a, b) => b.precio - a.precio);
        }
        else if (event === "nombreAsc") {
            orderProducts=[...orderProducts].sort((a, b) => a.nombre.localeCompare(b.nombre));
        }
        else if (event === "nombreDesc") {
            orderProducts=[...orderProducts].sort((a, b) => b.nombre.localeCompare(a.nombre));
        }
        setProducts(orderProducts);
    }

    useEffect(() => {
        if (selectedFilters.length > 0) {
            const selectedGeneros = selectedFilters.filter(f => allFilters.generos.includes(f));
            const selectedColores = selectedFilters.filter(f => allFilters.colores.includes(f));
            const selectedMarcas = selectedFilters.filter(f => allFilters.marcas.includes(f));
            const selectedTalles = selectedFilters.filter(f => allFilters.talles.includes(f));
            
            const filteredProducts = allProducts.filter((producto) => {
                // filtamos siempre desde allProducts que es la lista completa de productos
                // si lo hicieramos desde products, los productos que fueron eliminados en un filtrado anterior ya no se considerarán en el nuevo filtrado
                const cumpleGenero = selectedGeneros.length === 0 || selectedGeneros.includes(producto.genero);
                const cumpleColor = selectedColores.length === 0 || producto.colores.some(color => selectedColores.includes(color.nombre));
                const cumpleMarca = selectedMarcas.length === 0 || selectedMarcas.includes(producto.marca.nombre);
                const cumpleTalle = selectedTalles.length === 0 || 
                producto.talles_indumentaria?.some(t => selectedTalles.includes(t.nombre)) ||
                producto.talles_calzado?.some(t => selectedTalles.includes(t.nombre)) ||
                producto.talles_accesorios?.some(t => selectedTalles.includes(t.nombre));
                return cumpleGenero && cumpleColor && cumpleMarca && cumpleTalle;
            });
    
            setProducts(filteredProducts); 
        } else {
            setProducts(allProducts); // si no hay filtros marcados muestra todos los productos
        }
    }, [ selectedFilters, allProducts ]); // cada vez que el usuario marca o desmarca un filtro el codigo se ejecuta

    // Funcion para eliminar un solo filtro
    const deleteFilter = (filtro) => {   
    // filtra el filtro que se ha clickeado fuera del array de selectedFilters
    const updatedFilters = selectedFilters.filter(item => item !== filtro);
    setSelectedFilters(updatedFilters);

    }
    // Funcion para eliminar todos los filtros
    const deleteAllFilters = () => {
        setSelectedFilters([]);
    }

    // ocultar o mostrar todos los filtros en caso de que sean mas de 8
    const showFilters = showAllFilters ? allFilters.talles : allFilters.talles.slice(0, 8);

    const generosUnicos = [...new Set(products.map(p => p.genero.toLowerCase()))];

    const capitalizar = (str) => str.charAt(0).toUpperCase() + str.slice(1);


    return (
        <div className="max-w-[1350px] mx-auto px-4">
            {/* INTRO ASIDE */}
            <div className="min-h-[80px] ml-10 mr-4 flex justify-between items-center gap-4" >
                <Breadcrumbs categorie={categorie} genero={filtro}></Breadcrumbs>
                <div className="flex gap-5 p-[20px] flex-wrap justify-center">
                    {selectedFilters.map((filtro) => (
                    <button onClick={() => deleteFilter(filtro)} value={filtro} className="bg-gray-400 px-[12px] py-[8px] flex items-center justify-center rounded-2xl gap-2 cursor-pointer hover:bg-gray-300">
                        <h4 className="text-[11px] font-bold">{filtro}</h4>
                        <span className="text-[11px] font-medium rounded-3xl h-[17px] w-[17px] bg-gray-200 flex items-center justify-center">X</span>
                    </button> 
            ))}
                {selectedFilters.length > 0 ? <button className="cursor-pointer text-gray-400 hover:text-gray-300 font-bold"
                onClick={deleteAllFilters}>Borrar filtros</button> : '' }
                
                </div>
                <div>
                        <select onChange={(e) => {
                            setOrder(e.target.value)
                            HandleOrderChange(e.target.value)}}
                            value={order}
                            className=" max-w-[500px] p-3 border border-gray-400 rounded text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-cuarto focus:border-transparent transition duration-200">
                            <option value="">Ordenar por..</option>
                            <option value="precioAsc">Precio: Menor a Mayor</option>
                            <option value="precioDesc">Precio: Mayor a Menor</option>
                            <option value="nombreAsc">Nombre: A - Z</option>
                            <option value="nombreDesc">Nombre: Z - A </option>
                        </select>
                </div>
            </div>

        
        <div className='grid grid-cols-[1fr_5fr]'>

        {/* ASIDE */}
        <aside className="border-r border-gray-300 ml-[40px]">
        {!filtro ? (
            <div className="mb-8">
                {categorie !== 'marcas'  ? (
                <>
                    <h3 className="text-[22px] font-bold mb-[10px]">Genero</h3>
                    {generosUnicos.map((generos) => (
                        <ul>
                            <li className="mb-1">
                                <Link to={`/${categorie}/${generos}`} className="text-[15px] font-normal text-gray-600 hover:text-gray-400 ">
                                {capitalizar(generos)}
                                </Link>
                            </li>
                        </ul>
                    ))}
                </>
            ) : (
                <>
                    <h3 className="text-[22px] font-bold mb-[10px]">Marcas</h3>
                    {allFilters.marcas.map((marca) => (
                        <ul>
                            <li className="mb-1">
                                <Link to={`/marcas/${marca}`} className="text-[15px] font-normal text-gray-600 hover:text-gray-400 ">
                                    {marca}
                                </Link>
                            </li>
                        </ul>
                    
                    ))}
                </>
                )} 
            </div>) : (
                <div>
                    <Link to={`/${categorie}/`} className="text-[13px] flex items-center mb-[15px] text-gray-400">
                        <i class="bi bi-caret-left"></i>
                        <span className="text-[14px] leading-none">{capitalizar(categorie)}</span>
                    </Link>
                    <h3 className="text-[22px] font-bold mb-[10px]">Filtrar Por</h3>
                </div>
        )}
            


    <h3 className="font-bold text-[16px] mb-2 mt-4">Color</h3>
    {allFilters.colores.map((color, index) => {
        // Contamos cuántos productos tienen este color
        const cantidad = products.filter(producto => producto.colores.some(c => c.nombre === color)).length;
        return (
        <label key={index} className="flex mb-[3px] items-center text-gray-700 hover:text-cuarto cursor-pointer">
            <input type="checkbox" name="color"
            onChange={HandleChange} checked={selectedFilters.includes(color)} 
            value={color} className="input-checked mr-2 w-[15px] h-[15px] appearance-none border-2 border-gray-500 hover:border-cuarto  checked:bg-white rounded" />
            <h5 className="text-[14px] font-normal ml-[10px]">{color} </h5>
            <span className="text-[13px] font-normal ml-[5px]"> ({cantidad})</span>
        </label>
        
        )
    })}

<h3 className="font-bold text-[16px] mb-2 mt-[20px]">Marca</h3>
    {allFilters.marcas.map((marca, index) => {
        const cantidad = products.filter(producto => producto.marca.nombre === marca).length;
        return (
        <label key={index} className="flex mb-[3px] items-center text-gray-700 hover:text-cuarto cursor-pointer">
            <input type="checkbox" name="color" onChange={HandleChange} 
            checked={selectedFilters.includes(marca)}  value={marca} 
            className="input-checked mr-2 w-[15px] h-[15px] appearance-none border-2 border-gray-500 hover:border-cuarto  checked:bg-white rounded" />
            <h5 className="text-[14px] font-normal ml-[10px]">{marca}</h5>
            <span className="text-[13px] font-normal ml-[5px]">({cantidad})</span>
        </label>
    )
    })}

<h3 className="font-bold text-[16px] mb-2 mt-[20px]">Talles</h3>
    {showFilters.map((talle, index) => {
        const cantidad = products.filter(producto => 
            (producto.talles_indumentaria?.some(t => t.nombre === talle) || 
            producto.talles_calzado?.some(t => t.nombre === talle) || 
            producto.talles_accesorios?.some(t => t.nombre === talle))
        ).length;
        return (
        <label key={index} className="flex mb-[3px] items-center text-gray-700 hover:text-cuarto cursor-pointer">
            <input type="checkbox" name="talle" onChange={HandleChange} 
            checked={selectedFilters.includes(talle)}  value={talle} 
            className="input-checked mr-2 w-[15px] h-[15px] appearance-none border-2 hover:border-cuarto  border-gray-500 checked:bg-white rounded" />
            <h5 className="text-[14px] font-normal ml-[10px]">{talle}</h5>
            <span className="text-[13px] font-normal ml-[5px]">({cantidad})</span>
        </label>
    )
    })}
    {allFilters.talles.length > 8 && (
        <button onClick={() => {setShowAllFilters(prev => !prev)}} 
        className="mt-[7px] px-[8px] py-[4px] text-[13px] text-gray-500 border border-gray-500 hover:border-cuarto hover:text-cuarto cursor-pointer rounded-2xl ">
            {showAllFilters ? "Ver menos" : "Ver todos"}
        </button>
    )}
</aside>

        {/* PRODUCTS CATEGORIA */}
        <div className="grid justify-center gap-[20px] my-[20px] grid-cols-[repeat(auto-fit,_250px)] auto-rows-[390px]">
            <Cards product={products}></Cards>
        </div>  
    </div>
        </div>
        
    );
};

export default CategoriaPage;