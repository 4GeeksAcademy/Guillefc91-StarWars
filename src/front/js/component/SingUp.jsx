import React from "react";
import { Link } from "react-router-dom";

export const SingUp = () =>{
    return(
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{width: "400px"}}>
            <h2 className="text-center mb-4">Crear Cuenta</h2>
            <form>
                
                <div className="form-group">
                    <label htmlFor="firstName">Nombre</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Ingresa tu nombre"/>
                </div>
                
                <div className="form-group mt-2">
                    <label htmlFor="lastName">Apellido</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Ingresa tu apellido"/>
                </div>

                
                <button type="submit" className=" btn btn-primary btn-block mt-2">Registrarse</button>
               
                <p className="mt-3 text-center">¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
            </form>
        </div>
    </div>
    )
}
