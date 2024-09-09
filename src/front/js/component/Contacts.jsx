import React, { useContext } from "react";
import { Context } from "../store/appContext.js";

export const Contacts = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <div className="navbar navbar-dark bg-dark p-4">
                <h1 className="text-light pt-4">Contacts</h1>
                <a href="/add-contact">
                    <button className="btn btn-secondary">Add Contact</button>
                </a>
            </div>
            <ul>
                {/* Mapeando la lista de contactos */}
                {store.contactsCard.map((item, index) => (
                    <li key={index}>
                        <div className="col-md-8">
                            <div className="card-body d-flex justify-content-between">
                                <img
                                    height="55"
                                    src="https://starwars.chocobar.net/star-wars-logo.png"
                                    alt="Contacto"
                                />
                                <div>
                                    {/* Nombre */}
                                    <h5 className="card-title">{item.name}</h5>
                                    
                                    {/* Ubicación */}
                                    <p className="card-text">
                                        <i className="fas fa-map-marker-alt"></i> Ubicación: {item.address}
                                    </p>

                                    {/* Teléfono */}
                                    <p className="card-text">
                                        <i className="fas fa-phone"></i> Teléfono: {item.phone}
                                    </p>

                                    {/* Email */}
                                    <p className="card-text">
                                        <i className="fas fa-envelope"></i> Email: {item.email}
                                    </p>
                                </div>
                                <div className="d-flex justify-content-end">
                                    {/* Botón de editar */}
                                    <button
                                        className="btn btn-secondary me-2"
                                        onClick={() => console.log("Editar contacto")}
                                    >
                                        <i className="fas fa-pen"></i> Editar
                                    </button>
                                    
                                    {/* Botón de borrar */}
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => actions.deleteContact(item.name)}
                                    >
                                        <i className="fas fa-trash-alt"></i> Borrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
