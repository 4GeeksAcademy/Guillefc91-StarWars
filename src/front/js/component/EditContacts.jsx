import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const EditConctacts = () => {
    const { store,actions } = useContext(Context);
    const navigate = useNavigate();
    


    // State para los campos del formulario
    const [fullName, setFullName] = useState(store.currentContacts.name);
    const [email, setEmail] = useState(store.currentContacts.email);
    const [phone, setPhone] = useState(store.currentContacts.phone);
    const [address, setAddress] = useState(store.currentContacts.address);

    // Manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = {
            "name": fullName,
            "email": email,
            "phone": phone,
            "address": address
        };
        actions.editContact(store.currentContacts.id,dataToSend)
        actions.setCurrentContacts({})
        navigate("/contacts")
    };

    return (
        <div className="container">
            <h1>Add New Contact</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        required
                    />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
};
