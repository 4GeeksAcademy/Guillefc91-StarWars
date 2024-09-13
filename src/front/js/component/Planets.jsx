import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner.jsx";
import { Context } from "../store/appContext.js";

export const Planets = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getPlanets();
    }, [])

    const handleError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }
    const handleDetails = (item) =>{

    }

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 mt-2 container-fluid w-100  p-0 ms-3 mb-2 ">
        
            {store.planets.length === 0 ? <Spinner /> :
                store.planets.map((item, index) => {
                    return (
                        <div className="col-3 d-flex justify-content-between mt-2">
                            <div key={index} className="card " style={{ width: "10rem" }}>
                                <img onError={handleError} 
                                src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`} 
                                style = {{aspectRatio:"1/1", width:"100%"}}
                                className="card-img-top " alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title d-flex justify-content-center">{item.name}</h5>
                                    <div className="d-flex justify-content-between mt-4">
                                    <Link to={`/planets/${item.uid}`} onClick={handleDetails(item.url)} className="btn btn-secondary">Details</Link>
                                    <button onClick={()=> actions.addfavorites({name:item.name,type:"planets"})} className="btn favorite-btn">
                                        <i className="fas fa-heart width"></i> 
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })}

        </div>
    )
}