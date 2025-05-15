
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Header from './layout/Header'
const Home= lazy(() => import('./pages/Home'));
const CategoriaPage = lazy(() => import('./pages/Categories'));
const ProductDetail = lazy(() => import('./pages/ProductsDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Pedido = lazy(() => import('./pages/Pedidos'));
const PedidoConfirmado = lazy(() => import('./pages/PedidoConfirmado'));
const Register = lazy(() => import('./pages/auth/Register'));
const Login = lazy(() => import('./pages/auth/Login'));
const Account = lazy(() => import('./pages/auth/Account'));
import Loader from './components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext'; 
import { useCart } from './context/CartContext';
import { useNavigate } from "react-router-dom";


function App() {

  const { user, token, logout } = useAuth(); 
  const { setCartProducts } = useCart();
  const navigate = useNavigate();

  


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
            imagen_principal: `http://localhost:8000${item.producto.imagenes[1].imagen}`,
            color: item.color,
            talle: item.talle,
            cantidad: item.cantidad,
            tallesDisponibles: item.producto.talles
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
    <Header />
    <Suspense fallback={<Loader />} >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:categorie" element={<CategoriaPage />} />
        <Route path="/:categorie/:filtro" element={<CategoriaPage />} />
        <Route path="/:categorie/:filtro/:tipo" element={<CategoriaPage />} />
        <Route path="/producto/:id/" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/pedido-confirmado/:id" element={<PedidoConfirmado />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Suspense>
  <ToastContainer />
    </>
  )
}

export default App
