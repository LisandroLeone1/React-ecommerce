import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const addToCart = (product) => { 
        setCartProducts((prev) => {
            const existingProduct = prev.find(item =>
                item.id === product.id &&
                item.color.id === product.color.id &&
                item.talle === product.talle
            );
    
            if (existingProduct) {
                return prev;
            } else {
                return [...prev, { ...product, cantidad: product.cantidad}];
            }
        });
    };

    

    const deleteToCart = (id, talle, color) => {
        setCartProducts((prev) => prev.filter(item => 
                                    !(item.id === id &&
                                    item.talle === talle &&
                                    item.color.id === color)
                                ));
    };

    const emptyCart = () => setCartProducts([]);

    const calcularTotalConDescuento = (cartProducts) => {
        return cartProducts.reduce((total, producto) => {
            const precioFinal = (producto.precio - (producto.precio * producto.descuento / 100)) * producto.cantidad;
            return total + precioFinal;
        }, 0).toFixed(2);
    };

    const cantidadProducts = cartProducts.length;
    console.log(`cantidad de productos: ${cantidadProducts}`);

    const actualizarProducto = (id, talleActual, CantidadActual, nuevoTalle, nuevaCantidad) => {
        setCartProducts((prev) => 
        prev.map(item =>
            item.id === id && item.talle === talleActual && item.cantidad === CantidadActual ? 
            {...item, cantidad: nuevaCantidad, talle: nuevoTalle}
            : item
        ))
    }

    const aumentarCantidad = (id, talleActual) => {
        setCartProducts((prev) => 
        prev.map(item => 
            item.id === id && item.talle === talleActual && item.cantidad < item.stock ? {...item, cantidad: item.cantidad + 1}
            : item
        ));
    };

    const disminuirCantidad = (id, talleActual) => {
        setCartProducts((prev) => 
        prev.map(item =>
            item.id === id && item.talle === talleActual && item.cantidad > 1 
            ? {...item, cantidad: item.cantidad - 1}
            : item
        ));
    };

    return (
        <CartContext.Provider value={{ cartProducts, 
        setCartProducts,
        addToCart, 
        deleteToCart, 
        emptyCart, 
        calcularTotalConDescuento,
        cantidadProducts,
        aumentarCantidad, 
        disminuirCantidad,
        actualizarProducto
        }}>
            { children }
        </CartContext.Provider>
    );
};