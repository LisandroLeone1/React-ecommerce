import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetProducts from "../Api.jsx";
import Cards from "../components/CardsProducts/Cards.jsx";
import Aside from "../layout/Aside.jsx";
import Bread from "../components/Bread.jsx";
import Input from "../components/Inputs.jsx";

const CategoriaPage = () => {
    const { categorie, filtro, tipo } = useParams();
    const [crumbs, setCrumbs] = useState([categorie, filtro, tipo]);
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
    const [mostrarModal, setMostrarModal] = useState(false);

    // filtro los productos segun su categoria o si esta en estado 'sale'
    useEffect(() => {
        GetProducts().then((data) => {
            let filteredProducts = data;

            if (categorie === "sale") {
                filteredProducts = filteredProducts.filter(p => p.estado === "sale");
            } else if (categorie === "marcas") {
                if (filtro) {
                    filteredProducts = filteredProducts.filter(
                    p => p.marca.nombre.toLowerCase() === filtro.toLowerCase());
                }
            } else {
                filteredProducts = filteredProducts.filter(
                    p => p.categoria.toLowerCase() === categorie.toLowerCase());
            }
            
            if (filtro && categorie !== "marcas") {
                filteredProducts = filteredProducts.filter(
                    p => p.genero.toLowerCase() === filtro.toLowerCase());
            }

            if (tipo) {
                filteredProducts = filteredProducts.filter(
                    p => p.tipo_producto.nombre.toLowerCase() === tipo.toLocaleLowerCase()
                );
            }
        
            setProducts(filteredProducts);
            setAllProducts(filteredProducts);

            const colores = new Map();
            const marcas = new Set();
            const generos = new Set();
            const talles = new Set();
            
            // obtengo todos los colores, marcas y generos disponibles
            filteredProducts.forEach(producto => {
                producto.colores.forEach(c => colores.set(c.nombre, {
                    nombre: c.nombre,
                    style: c.color_style
                }));
                marcas.add(producto.marca.nombre);
                generos.add(producto.genero);
                producto.talles.forEach(t => talles.add(t.nombre));
                /*producto.talles_indumentaria?.forEach(talle => talles.add(talle.nombre));
                producto.talles_calzado?.forEach(talle => talles.add(talle.nombre));
                producto.talles_accesorios?.forEach(talle => talles.add(talle.nombre));*/
            });
            // las guardo como array en allFilters
            setAllFilters({
                colores: [...colores.values()], 
                generos: [...generos],
                marcas: [...marcas],
                talles: [...talles],
            });
            // reseteao los filtros al cambiar de categoria
            setSelectedFilters([]);
        });
    }, [categorie, filtro, tipo]);

    const HandleChange = (event) => {
        const { value, checked } = event.target;
        // si el checkbox esta checked guardo el valor en selectdFilters
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
            const selectedColores = selectedFilters.filter(f => allFilters.colores.some(color => color.nombre === f));
            const selectedMarcas = selectedFilters.filter(f => allFilters.marcas.includes(f));
            const selectedTalles = selectedFilters.filter(f => allFilters.talles.some(talle => talle.nombre === f));
            
            const filteredProducts = allProducts.filter((producto) => {
                // filtamos siempre desde allProducts que es la lista completa de productos
                // si lo hicieramos desde products, los productos que fueron eliminados en un filtrado anterior ya no se considerarán en el nuevo filtrado
                const cumpleGenero = selectedGeneros.length === 0 || selectedGeneros.includes(producto.genero);
                const cumpleColor = selectedColores.length === 0 || producto.colores.some(c => selectedColores.includes(c.nombre));
                const cumpleMarca = selectedMarcas.length === 0 || selectedMarcas.includes(producto.marca.nombre);
                const cumpleTalle = selectedTalles.length === 0 || producto.talles.some(t => selectedTalles.includes(t.nombre));
                                                            
                console.log(producto.talles);
                /*producto.talles_indumentaria?.some(t => selectedTalles.includes(t.nombre)) ||
                producto.talles_calzado?.some(t => selectedTalles.includes(t.nombre)) ||
                producto.talles_accesorios?.some(t => selectedTalles.includes(t.nombre));*/
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
    const tiposUnicos = [...new Set(products.map(t => t.tipo_producto.nombre.toLowerCase()))];

    const capitalizar = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    useEffect(() => {
        setCrumbs([categorie, filtro, tipo].filter(Boolean)); // con filter(Boolean) elimino cuando uno es null o undefined
    }, [categorie, filtro, tipo]);


    return (
        <div className="max-w-[1350px] mx-auto px-4">
            {/* INTRO ASIDE */}
            <div className="min-h-[80px] flex flex-col justify-center items-center mt-3
                md:flex-row md:justify-between md:items-center md:ml-10 md:mr-4 md:gap-4 md:mt-0" >

                <Bread crumbs={crumbs} flexClass='flex-wrap lg:flex-nowrap' className='font-bold text-gray-600'  />

                <div className="mt-4 flex flex-wrap justify-center gap-2 md:gap-5 md:p-[20px] md:w-full  md:mt-0">
                    {selectedFilters.map((filtro) => (
                    <button onClick={() => deleteFilter(filtro)} value={filtro} className="bg-gray-300 px-[12px] py-[8px] flex items-center justify-center rounded-2xl gap-2 cursor-pointer hover:bg-gray-200">
                        <h4 className="text-[11px] font-bold">{filtro}</h4>
                        <span className="text-[11px] font-medium rounded-3xl h-[17px] w-[17px] bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                            X
                        </span>
                    </button> 
                    ))}
                    {selectedFilters.length > 0 ? <button className="cursor-pointer text-gray-400 hover:text-gray-300 font-bold"
                        onClick={deleteAllFilters}>Borrar filtros</button> : '' }
                </div>
                <div className="flex gap-5 mt-5 md:mt-0">
                    <button
                        onClick={() => setMostrarModal(true)}
                        className="md:hidden cursor-pointer shadow-sm flex items-center gap-17 p-3 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:border-cuarto transition">
                            <span className="text-sm font-medium">Filtrar</span>
                            <i className="bi bi-filter"></i>
                    </button>
                    <Input
                        labelValue="orden"
                        type="select"
                        value={order}
                        onChange={(e) => {
                        setOrder(e.target.value);
                        HandleOrderChange(e.target.value);}}
                        renderOptions={() => [
                            <option key="" value="">Ordenar por..</option>,
                            <option key="precioAsc" value="precioAsc">Precio: Menor a Mayor</option>,
                            <option key="precioDesc" value="precioDesc">Precio: Mayor a Menor</option>,
                            <option key="nombreAsc" value="nombreAsc">Nombre: A - Z</option>,
                            <option key="nombreDesc" value="nombreDesc">Nombre: Z - A</option>,
                            ]}
                    />     
                </div>
            </div>

            {mostrarModal && (
                <div className="fixed inset-0 z-1400 w-full h-full md:hidden">
                    <div className="absolute inset-0 bg-black opacity-40"></div>

                    <div className="bg-white opacity-100 w-[80%] max-w-[600px] h-full overflow-y-auto relative">

                        <div className=" bg-gray-600 flex justify-between items-center p-5">
                            <h3 className="text-xl font-bold text-gray-200">Filtros</h3>
                            <button
                                className=" text-gray-500 hover:text-white text-xl cursor-pointer"
                                onClick={() => setMostrarModal(false)}
                            >
                            <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div className="p-5">
                        <Aside
                            filtro={filtro}
                            categorie={categorie}
                            tipo={tipo}
                            capitalizar={capitalizar}
                            generosUnicos={generosUnicos}
                            tiposUnicos={tiposUnicos}
                            allFilters={allFilters}
                            selectedFilters={selectedFilters}
                            HandleChange={HandleChange}
                            products={products}
                            cerrarModal={() => setMostrarModal(false)}/>

                        </div>
                    </div>
                </div>
                )}

        
            <div className='grid md:grid-cols-[1fr_5fr]'>

            {/* ASIDE */}
            <aside className="hidden md:block border-r border-gray-300 ml-[40px]">
                <Aside
                    filtro={filtro}
                    categorie={categorie}
                    tipo={tipo}
                    capitalizar={capitalizar}
                    generosUnicos={generosUnicos}
                    tiposUnicos={tiposUnicos}
                    allFilters={allFilters}
                    selectedFilters={selectedFilters}
                    HandleChange={HandleChange}
                    products={products}/>
            </aside>

            {/* PRODUCTS CATEGORIA */}
            <div className="grid justify-center gap-[20px] my-[20px] grid-cols-[repeat(auto-fit,_250px)] auto-rows-[390px]">
                <Cards product={products} 
                    heigth='h-[443px]'
                    heightHover='h-[390px]'>
                </Cards>
            </div>  
        </div>
    </div>
        
    );
};

export default CategoriaPage;