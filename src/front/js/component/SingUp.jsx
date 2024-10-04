import React from "react";

export const SingUp = () =>{
    return(
        <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow" style="width: 400px;">
            <h2 class="text-center mb-4">Crear Cuenta</h2>
            <form>
                
                <div class="form-group">
                    <label for="firstName">Nombre</label>
                    <input type="text" class="form-control" id="firstName" placeholder="Ingresa tu nombre"/>
                </div>
                
                <div class="form-group">
                    <label for="lastName">Apellido</label>
                    <input type="text" class="form-control" id="lastName" placeholder="Ingresa tu apellido"/>
                </div>

                
                <button type="submit" class="btn btn-primary btn-block">Registrarse</button>
               
                <p class="mt-3 text-center">¿Ya tienes una cuenta? <a href="#">Inicia sesión</a></p>
            </form>
        </div>
    </div>
    )
}
