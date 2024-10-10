import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Contacts = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getContacts();
    }, [])
    return (
        <div>
            <div>
                <div className="navbar navbar-dark bg-dark p-2">
                    <h1 className="text-light pt-2 ms-4">Contacts</h1>
                    <Link to="/add-contact">
                        <button className="btn btn-outline-light me-4">Add Contact</button>
                    </Link>
                </div>
                <ul className="list-unstyled container mt-4">
                    {/* Mapeando la lista de contactos */}
                    {store.contactsCard.map((item, index) => (
                        <li key={index} className="mb-3">
                            <div className="card">
                                <div className="card-body d-flex">
                                    <img className="w-25" src="https://i.ebayimg.com/images/g/0g8AAOSwkChmEoaY/s-l960.webp" alt="Contacto" />
                                    <div className="flex-grow-1 ms-4 mt-5">
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
                                    <div className="d-flex flex-column align-items-end me-4 mt-5">
                                        {/* Botón de editar */}
                                        <Link to="/edit-contact">
                                            <button
                                                className="btn btn-outline-success mb-2 p-4"
                                                onClick={() => actions.setCurrentContacts(item)}
                                            >
                                                <i className="fas fa-pen"></i> Editar
                                            </button>
                                        </Link>

                                        {/* Botón de borrar */}
                                        <button
                                            className="btn btn-outline-danger p-4"
                                            onClick={() => actions.deleteContact(item.id)}
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
        </div>
    );
};
