import React, { useContext } from "react"
import { Context } from "../store/appContext.js"

export const Favorite = () => {
    const{store,actions} = useContext(Context)
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Favorite
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {store.favorites.map((item,index)=>{
                    console.log(item)
                    return(
                        <li key = {index}>{item.name} to {item.type} <span onClick={()=>actions.removeFavorites(item)}>
                            <i className="fas fa-trash"></i>
                            </span> </li>
                    )
                   
                })}
                
            </ul>
        </div>

    )
}