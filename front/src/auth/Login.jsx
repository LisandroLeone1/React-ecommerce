import { useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";


const Login = () => {
    const [dataUser, setDataUser] = useState({ username: "", password: "" });
    const [mensaje, setMensaje] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const mensajeExito = location.state?.mensaje;

    const handleChange = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const respuesta = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataUser),
        });

        const data = await respuesta.json();
            if (respuesta.ok) {
                login(data.access);
                setMensaje("Iniciaste sesion con exito.");
                navigate('/');
            } else {
                setMensaje("Usuario o contraseña incorrectos");
            }
    };

    return (
        <div className=" flex justify-center items-center">
            <div className="p-4 w-[55%]"> 
            <h2 className="text-3xl mb-5 mt-5 font-bold text-center text-secundario">Iniciar Sesión</h2>
            {mensajeExito && ( <p className="text-gray-500 text-center mb-2">¡{mensajeExito}!</p>)}    
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-[14px] text-gray-500">Username</label>
                    <input name="username" onChange={handleChange} value={dataUser.username}
                        className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="text-[14px] text-gray-500">Password</label>
                    <input name="password" type="password" onChange={handleChange} value={dataUser.password}
                        className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto" 
                    />
                </div>
                {mensaje && (<p className="text-red-500 text-[13px]">{mensaje}</p>)}
                <div>
                    <button type="submit" className="w-full flex justify-center mt-1 px[20px] py-[13px] bg-cuarto cursor-pointer border-none text-white font-medium rounded">
                        Iniciar sesión
                    </button>
                    <Link to="/register"
                        className="w-full flex justify-center mt-1 px[20px] py-[13px] bg-quinto cursor-pointer border-none text-cuarto font-medium rounded">
                        Crear cuenta
                    </Link>
                </div>
                
            </form>
        </div>
        </div>
        
        );
}

export default Login;