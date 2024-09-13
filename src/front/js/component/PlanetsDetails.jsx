import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import { Spinner } from "./Spinner.jsx";

export const PlanetsDetails = () => {
    const { store, actions } = useContext(Context)
    const params = useParams();
    useEffect(() => {
        actions.getPlanetsDetails(params.uid);
    }, [])
    return (

        <div className="container d-flex justify-content-between">

            {store.planetsDetails.name === undefined ? <Spinner />
                :
                <>

                    <div className="ms-5 mt-4">
                        <h1 className="text-decoration-underline">Details</h1>
                        &nbsp;
                        <h4>Id: {params.uid}</h4>
                        <h4>Name: {store.planetsDetails.name}</h4>
                        <h4>Skin Color: {store.planetsDetails.skin_color}</h4>
                        <h4>Eye Color: {store.planetsDetails.eye_color}</h4>
                        <h4>Hair Color: {store.planetsDetails.hair_color}</h4>
                    </div>
                    <div>

                        <img className="my-4 me-4 d-flex"
                            src={`https://starwars-visualguide.com/assets/img/planets/${params.uid}.jpg`} />
                    </div>
                </>

            }

        </div>
    )

}