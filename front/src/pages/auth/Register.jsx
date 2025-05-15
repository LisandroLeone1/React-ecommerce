import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Inputs";

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
                    <Input
                            labelName="Nombre de usuario"
                            labelValue="username"
                            name="username"
                            type="text"
                            value={newUser.username}
                            onChange={handleChange}
                            error={errores.username}
                        />
                    <Input
                            labelName="Nombre completo"
                            labelValue="first_name"
                            name="first_name"
                            type="text"
                            value={newUser.first_name}
                            onChange={handleChange}
                            error={errores.first_name}
                        />
                    <Input
                            labelName="Apellido"
                            labelValue="last_name"
                            name="last_name"
                            type="text"
                            value={newUser.last_name}
                            onChange={handleChange}
                            error={errores.last_name}
                        />
                    <Input
                            labelName="Dirección"
                            labelValue="address"
                            opcional={true}
                            name="address"
                            type="text"
                            value={newUser.address}
                            onChange={handleChange}
                            error={errores.address}
                        />
                    <Input
                            labelName="Numero de telefono"
                            labelValue="phone_number"
                            opcional={true}
                            name="phone_number"
                            type="tel"
                            value={newUser.phone_number}
                            onChange={handleChange}
                            error={errores.phone_number}
                        />
                    <Input
                            labelName="Fecha de nacimiento"
                            labelValue="birth_date"
                            opcional={true}
                            name="birth_date"
                            type="date"
                            value={newUser.birth_date}
                            onChange={handleChange}
                            error={errores.birth_date}
                        />
                    <Input
                            labelName="Email"
                            labelValue="email"
                            opcional={true}
                            name="email"
                            type="email"
                            value={newUser.email}
                            onChange={handleChange}
                            error={errores.email}
                        />
                    <Input
                            labelName="Contraseña"
                            labelValue="password"
                            opcional={true}
                            name="password"
                            type="password"
                            value={newUser.password}
                            onChange={handleChange}
                            error={errores.password}
                        />
                    <Input
                            labelName="Repetir contraseña"
                            labelValue="password2"
                            opcional={true}
                            name="password2"
                            type="password"
                            value={newUser.password2}
                            onChange={handleChange}
                            error={errores.password2}
                        />
                
                    <div>
                        <Button type="submit">
                            Registrarte
                        </Button>
                        <p className="text-center text-gray-700 text-[14px] my-2">¿Ya tenes una cuenta?</p>
                        <Link to="/login" className="flex mt-2">
                        <Button fakeDisabled={true} extraClass="cursor-pointer">
                            Inicia sesión
                        </Button>
                    </Link>
                    </div>

                </form>
                {mensaje && <p className="mt-2">{mensaje}</p>}
            </div>
        </div>

    );
}

export default Register;