import React, { useState, useContext } from "react"; // Importación corregida
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const {store,actions} = useContext(Context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);
    const navigate = useNavigate()

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSend = { email, password };
        console.log(dataToSend);
        await actions.login(dataToSend)
        console.log(store.isLoged)
        if(store.isLoged){
            navigate("/")
        } else{
            navigate("/protected")
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 shadow" style={{ width: "400px" }}>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                onChange={handleEmail}
                                value={email}
                                className="form-control"
                                id="email"
                                placeholder="Ingresa tu correo"
                            />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="password">Contraseña</label>
                            <div className="d-flex">
                            <input
                                type={hidePassword ? "password" : "text"} // Mostrar/ocultar contraseña
                                onChange={handlePassword}
                                value={password}
                                className="form-control  "
                                id="password"
                                placeholder="Ingresa tu contraseña"
                            />
                            <span onClick={() => setHidePassword(!hidePassword)} className="input-group-text ">
                                {hidePassword ? <i className="far fa-eye"></i> : <i className="far fa-eye-slash"></i>}
                            </span>
                            </div>
                            
                        </div>

                        <div className="form-group form-check mt-2">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mt-2" onClick={handleSubmit}>Login</button>

                        <p className="mt-3 text-center">
                            ¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};