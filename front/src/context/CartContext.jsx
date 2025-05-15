import { createContext, useState, useContext } from "react";
import { useAuth } from "./AuthContext.jsx";


const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const { token } = useAuth();

    const addToCart = (product) => { 
        setCartProducts((prev) => {
            const existingProduct = prev.find(item =>
                item.id === product.id &&
                item.color.id === product.color.id &&
                item.talle.id === product.talle.id
            );
    
            if (existingProduct) {
                return prev;
            } else {
                return [...prev, { ...product, cantidad: product.cantidad}];
            }
        });
    };


    const vaciarCarritoEnBackend = async () => {
        const token = localStorage.getItem("token");
        try {
            await fetch(`http://localhost:8000/cart/api/carrito/vaciar-carrito/`, {
                method: "DELETE",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            });
            setCartProducts([])
        } catch (error) {
            console.error("Error al vaciar el carrito en el backend", error);
        }
    };

    const deleteToCart = (id, talle, color) => {
        setCartProducts((prev) => {
            const updatedCart = prev.filter(
            (item) =>
              !(
                item.id === id &&
                item.talle.id === talle &&
                item.color.id === color
              )
          );
      
          if (updatedCart.length === 0) {
            vaciarCarritoEnBackend(); // Vacía el carrito en el backend y frontend
          } else {
            setCartProducts(updatedCart); // Actualiza el carrito en el frontend
          }
      
          return updatedCart;
        });
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
            item.id === id && item.talle.id === talleActual.id && item.cantidad === CantidadActual ? 
            {...item, cantidad: nuevaCantidad, talle: nuevoTalle}
            : item
        ))
    }

    const aumentarCantidad = (id, talleActual) => {
        setCartProducts((prev) => 
        prev.map(item => 
            item.id === id && item.talle.id === talleActual && item.cantidad < item.stock ? {...item, cantidad: item.cantidad + 1}
            : item
        ));
    };

    const disminuirCantidad = (id, talleActual) => {
        setCartProducts((prev) => 
        prev.map(item =>
            item.id === id && item.talle.id === talleActual && item.cantidad > 1 
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
        vaciarCarritoEnBackend,
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