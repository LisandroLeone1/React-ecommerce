import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

    const Register = () =>  {
        const [newUser, setNewUser] = useState({
            });
        const [mensaje, setMensaje] = useState("");
        const [errores, setErrores] = useState({});
        const navigate = useNavigate();

        const handleChange = (e) => {
            setNewUser({ ...newUser, [e.target.name]: e.target.value });
            setErrores({});
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            const datosParaEnviar = {
                username: newUser.username,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                password: newUser.password,
                password2: newUser.password2,
                usuario: {
                    address: newUser.address,
                    phone_number: newUser.phone_number,
                    birth_date: newUser.birth_date
                }
            };

            const respuesta = await fetch("http://localhost:8000/users/api/user-register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosParaEnviar),
            });

            if (respuesta.ok) {
                setMensaje("Usuario registrado correctamente.");
                navigate('/login', { state: { mensaje: 'Usuario creado con éxito' } });
            } else {
                const data = await respuesta.json();
                console.log("Respuesta del backend:", data);
                setErrores(data);
            }

        
    };

    return (
        <div className="flex justify-center items-center">
            <div className="p-4 w-[55%]">
                <h2 className="text-3xl mb-5 mt-5 font-bold text-center text-secundario">Crear Cuenta</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-[14px] text-gray-500">Nombre de usuario</label>
                        <input id="username" name="username" onChange={handleChange} value={newUser.username}
                        className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto" />
                        {errores.username && <span className="text-red-500 text-[13px]">{errores.username}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="first_name" className="text-[14px] text-gray-500">Nombre completo</label>
                        <input id="first_name" name="first_name" onChange={handleChange} value={newUser.first_name}
                        className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto" />
                        {errores.first_name && <span className="text-red-500 text-[13px]">{errores.first_name}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="last_name" className="text-[14px] text-gray-500">Apellido</label>
                        <input id="last_name" name="last_name" onChange={handleChange} value={newUser.last_name}
                        className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto" />
                        {errores.last_name && <span className="text-red-500 text-[13px]">{errores.last_name}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="address" className="text-[14px] text-gray-500">
                            Dirección
                            <span className="text-[11px]"> (opcional)</span>
                        </label>
                        <input id="address" name="address" onChange={handleChange} value={newUser.address}
                        className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone_number" className="text-[14px] text-gray-500">
                            Numero de telefono
                            <span className="text-[11px]"> (opcional)</span>
                        </label>
                        <input id="phone_number" name="phone_number" onChange={handleChange} value={newUser.phone_number}
                        className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="birth_date" className="text-[14px] text-gray-500">
                            Fecha de Nacimiento
                            <span className="text-[11px]"> (opcional)</span>
                        </label>
                        <input id="birth_date" name="birth_date" onChange={handleChange} value={newUser.birth_date}
                        className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-[14px] text-gray-500">Email</label>
                        <input id="email" name="email" onChange={handleChange} value={newUser.email}
                            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto"/>
                        {errores.email && <span className="text-red-500 text-[13px]">{errores.email}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-[14px] text-gray-500">Contraseña</label>
                        <input id="password" name="password" type="password" onChange={handleChange} value={newUser.password}
                            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password2" className="text-[14px] text-gray-500">Repetir contraseña</label>
                        <input id="password2" name="password2" type="password" onChange={handleChange} value={newUser.password2}
                            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto"/>
                        {errores.password2 && <span className="text-red-500 text-[13px]">{errores.password2}</span>}    
                    </div>
                
                    <div>
                        <button type="submit" 
                        className="w-full flex justify-center mt-1 px[20px] py-[13px] bg-cuarto cursor-pointer border-none text-white font-medium rounded">
                            Registrarse
                        </button>
                        <p className="text-center text-gray-700 text-[14px] my-2">¿Ya tenes una cuenta?</p>
                        <Link to="/login"
                        className="w-full flex justify-center mt-1 px[20px] py-[13px] bg-quinto cursor-pointer border-none text-cuarto font-medium rounded">
                            Inicia Sesión
                        </Link>
                    </div>

                </form>
                {mensaje && <p className="mt-2">{mensaje}</p>}
            </div>
        </div>

    );
}

export default Register;