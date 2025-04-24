import { createContext, useState, useEffect, useContext } from "react";

// 1. Crear el contexto
    const AuthContext = createContext();

    export const useAuth = () => useContext(AuthContext);

// 2. Proveedor
    export const AuthProvider = ({ children }) => {
        const [user, setUser] = useState({}); 
        const [token, setToken] = useState(localStorage.getItem("token"));

        

        const GetDataUser = async (token) => {
            if (!token) return;
            try {
                const respuesta =  await fetch("http://localhost:8000/users/api/user-profile/",{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (respuesta.ok) {
                    const data = await respuesta.json();
                    console.log("Respuesta del backend:", data);
                    setUser({ username: data.username, 
                            first_name: data.first_name,
                            last_name: data.last_name,
                            email: data.email,
                            address: data.usuario?.address || "",
                            phone_number: data.usuario?.phone_number || "",
                            birth_date: data.usuario?.birth_date || ""
                        })
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error al obtener los datos del perfil', error)
                setUser(null);
            }
        }

        useEffect(() => {
            if (token) {
                GetDataUser(token);
            } else {
                setUser(null);
            }
        }, [token]);

        const login = (newToken) => {
            localStorage.setItem("token", newToken);
            setToken(newToken);
        };

        const logout = () => {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};