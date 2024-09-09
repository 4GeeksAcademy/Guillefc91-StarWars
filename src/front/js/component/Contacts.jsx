import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const Contacts = () => {
    const { store, actions } = useContext(Context);
    useEffect(()=>{
        actions.getContacts();
    },[])
    return (
        <div>
            <div className="navbar navbar-dark bg-dark p-4">
                <h1 className="text-light pt-4">Contacts</h1>
                <Link to="/add-contact">
                    <button className="btn btn-secondary">Add Contact</button>
                </Link>
            </div>
            <ul>
                {/* Mapeando la lista de contactos */}
                {store.contactsCard.map((item, index) => (
                    <li key={index}>
                        <div className="col-md-8">
                            <div className="card-body d-flex justify-content-between">
                                <img className="w-25"
                                src="https://i.ebayimg.com/images/g/0g8AAOSwkChmEoaY/s-l960.webp"
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
                                    <Link to="/edit-contact">
                                    <button
                                        className="btn btn-secondary me-2"
                                        onClick={()=>{
                                            actions.setCurrentContacts(item);
                                        }}
                                    >
                                        
                                        <i className="fas fa-pen"></i> Editar
                                    </button>
                                    </Link>
                                    
                                    
                                    
                                    {/* Botón de borrar */}
                                    <button
                                        className="btn btn-danger"
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
    );
};
