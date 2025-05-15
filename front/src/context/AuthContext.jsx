import { createContext, useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

// 1. Crear el contexto
    const AuthContext = createContext();

    export const useAuth = () => useContext(AuthContext);

// 2. Proveedor
    export const AuthProvider = ({ children }) => {
        const [user, setUser] = useState({}); 
        const [token, setToken] = useState(localStorage.getItem("token"));
        const [logoutReason, setLogoutReason] = useState(null);
        const [showLoginToast, setShowLoginToast] = useState(false);
        const navigate = useNavigate();
        
        useEffect(() => {
            const GetDataUser = async () => {
                if (!token) {
                    setUser(null);
                    return;
                }
        
                try {
                    const respuesta = await fetch("http://localhost:8000/users/api/user-profile/", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    });
        
                    if (respuesta.status === 401 || respuesta.status === 403) {
                        logout("expired"); 
                        return;
                    }
        
                    if (respuesta.ok) {
                        const data = await respuesta.json();
                        console.log("Respuesta del backend:", data);
        
                        setUser({
                            username: data.username,
                            first_name: data.first_name,
                            last_name: data.last_name,
                            email: data.email,
                            address: data.usuario?.address || "",
                            phone_number: data.usuario?.phone_number || "",
                            birth_date: data.usuario?.birth_date || ""
                        });
                    } else {
                        setUser(null);
                    }
        
                } catch (error) {
                    console.error('Error al obtener los datos del perfil', error);
                    setUser(null);
                }
            };
        
            GetDataUser();
        }, [token]);

        const login = (newToken) => {
            localStorage.setItem("token", newToken);
            setToken(newToken);
        };

        const logout = (reason = "expired") => {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
            setLogoutReason(reason);  // Ahora navega en el useEffect
        };

        useEffect(() => {
            if (logoutReason === "expired") {
                toast.info("Tu sesión ha expirado. Por favor, iniciá sesión.");
                navigate('/login');
                setLogoutReason(null);  // Limpiamos para que no se repita
            } else if (logoutReason === "manual") {
                toast.success("Sesión cerrada correctamente.");
                navigate('/');
                setLogoutReason(null);
            }
        }, [logoutReason, navigate]);

        const triggerLoginToast = () => {
            setShowLoginToast(true);
            setTimeout(() => setShowLoginToast(false), 3000);
        };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, showLoginToast, triggerLoginToast }}>
            {children}
        </AuthContext.Provider>
    );
};