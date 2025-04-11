import { useState } from 'react'
import './App.css'
import Header from './components/header'
import Products from './Products'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriaPage from './Categories';
import ProductDetail from './ProductsDetail';
import Cart from './Cart';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Header /> {/* Barra de navegación */}
      <Routes>
        {/* Rutas para las categorías */}
        <Route path="/" element={<Products />} /> {/* Página principal */}
        <Route path="/:categorie" element={<CategoriaPage />} />
        <Route path="/:categorie/:filtro" element={<CategoriaPage />} />
        <Route path="/producto/:id/" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
    </Router>
    </>
  )
}

export default App
