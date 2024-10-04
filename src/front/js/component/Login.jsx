import React from "react";
import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 shadow" style={{width: "400px"}}>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>

                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo" />
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" />
                        </div>

                        <div className="form-group form-check mt-2">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Recordarme</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mt-2">Iniciar Sesión</button>

                        <p className="mt-3 text-center">¿No tienes cuenta? <a href="/signup">Regístrate</a></p>
                    </form>
                </div>
            </div>
        </>
    )
}