
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Header from './components/header'
const Products = lazy(() => import('./Products'));
const CategoriaPage = lazy(() => import('./Categories'));
const ProductDetail = lazy(() => import('./ProductsDetail'));
const Cart = lazy(() => import('./Cart'));
const Register = lazy(() => import('./auth/Register'));
const Login = lazy(() => import('./auth/Login'));
const Account = lazy(() => import('./auth/Account'));
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext'; 
import { useCart } from './context/CartContext';

function App() {

  const { token } = useAuth(); 
  const { setCartProducts } = useCart();

  {/* CARGAR PRODUCTOS DE UN CARRO GUARDADO CUANDO UN USUARIO INICIA SECIÓN */}
  useEffect(() => {
    if (!token) return;

    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:8000/cart/api/carrito/ver-carrito/", {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });

        if (response.ok) {
          const data = await response.json();

          const fetchProducts = data.map(item => ({
            id: item.producto.id,
            nombre: item.producto.nombre,
            marca: item.producto.marca,
            precio: item.producto.precio,
            descuento: item.producto.descuento,
            stock: item.producto.stock,
            imagen_principal: `http://localhost:8000${item.producto.imagen_principal}`,
            color: item.color,
            talle: item.talle,
            cantidad: item.cantidad,
            tallesDisponibles: talles
          })); // le doy el formato adecuado para el front a los datos que obtengo del backend

          setCartProducts(fetchProducts);
        } else {
          console.error('Error al cargar el carrito');
        }
      } catch (error) {
        console.error("Error al traer el carrito:", error);
      }
    };

    fetchCart();
  }, [token]);

  return (
    <>
  <Router>
    <Header />
    <Suspense fallback={<Loader />} >
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:categorie" element={<CategoriaPage />} />
        <Route path="/:categorie/:filtro" element={<CategoriaPage />} />
        <Route path="/producto/:id/" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Suspense>
  </Router>
  <ToastContainer />
    </>
  )
}

export default App
