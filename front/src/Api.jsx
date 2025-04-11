import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/products/producto/", 
    headers: {
        "Content-Type": "application/json",
    },
});


const GetProducts = async (id = null) => {
    try {
        const url = id ? `/${id}/` : '/'
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo productos:", error);
        return id ? null : [];
    }
}

export default GetProducts;