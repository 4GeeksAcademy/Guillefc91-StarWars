import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner.jsx";
import { Context } from "../store/appContext.js";

export const Characters = () => {
    const { store,actions } = useContext(Context);
    useEffect(()=>{
        actions.getCharacters();
    },[])

    return (
        <>
            {store.characters.length === 0 ? <Spinner/> :
                store.characters.map((item,index) => {
                    return(
                        <div key = {index} className="card" style={{width: "18rem"}}>
                        <img src="..." className="card-img-top" alt={item.name}/>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <Link to="/*" className="btn btn-primary">Go somewhere</Link>
                            <Link to="/*" className="btn btn-primary">Go somewhere</Link>
                        </div>
                    </div>
                    )
                    
                })}

        </>
    )
}