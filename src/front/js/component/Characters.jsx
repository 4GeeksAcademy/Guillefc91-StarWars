import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner.jsx";
import { Context } from "../store/appContext.js";

export const Characters = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getCharacters();
    }, [])

    return (
        <>
            {store.characters.length === 0 ? <Spinner /> :
                store.characters.map((item, index) => {
                    return (
                        <div className="container m-4 d-flex justify-content-between">
                            <div key={index} className="card " style={{ width: "18rem" }}>
                                <img src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`} className="card-img-top " alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-center">{item.name}</h5>
                                    <div className="d-flex justify-content-between">

                                    <Link to="/*" className="btn btn-secondary">Details</Link>
                                    <Link to="/*" className="favorite-btn">
                                        <i className="fas fa-heart width"></i> 
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })}

        </>
    )
}