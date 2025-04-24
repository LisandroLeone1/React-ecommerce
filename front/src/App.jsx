
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/header'
const Products = lazy(() => import('./Products'));
const CategoriaPage = lazy(() => import('./Categories'));
const ProductDetail = lazy(() => import('./ProductsDetail'));
const Cart = lazy(() => import('./Cart'));
const Register = lazy(() => import('./auth/Register'));
const Login = lazy(() => import('./auth/Login'));
const Account = lazy(() => import('./auth/Account'));
import Loader from './components/Loader';

function App() {

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
    </>
  )
}

export default App
