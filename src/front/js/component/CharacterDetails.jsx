import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";
import { Spinner } from "./Spinner.jsx";

export const CharacterDetails = () => {
    const { store, actions } = useContext(Context)
    const params = useParams();
    useEffect(() => {
        actions.getCharacterDetails(params.uid);
    }, [])
    return (

        <div className="container d-flex justify-content-between">

            {store.characterDetails.name === undefined ? <Spinner />
                :
                <>

                    <div className="ms-5 mt-4">
                        <h1 className="text-decoration-underline">Details</h1>
                        &nbsp;
                        <h4>Id: {params.uid}</h4>
                        <h4>Name: {store.characterDetails.name}</h4>
                        <h4>Skin Color: {store.characterDetails.skin_color}</h4>
                        <h4>Eye Color: {store.characterDetails.eye_color}</h4>
                        <h4>Hair Color: {store.characterDetails.hair_color}</h4>
                    </div>
                    <div>

                        <img className="my-4 me-4 d-flex"
                            src={`https://starwars-visualguide.com/assets/img/characters/${params.uid}.jpg`} />
                    </div>
                </>

            }

        </div>
    )

}