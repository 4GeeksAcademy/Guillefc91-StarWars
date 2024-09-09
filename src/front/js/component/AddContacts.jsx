import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const AddContacts = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();


    // State para los campos del formulario
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = {
            "name": fullName,
            "email": email,
            "phone": phone,
            "address": address
        };
        actions.AddContacts(dataToSend);
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
