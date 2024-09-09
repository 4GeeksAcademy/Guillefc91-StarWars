import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-center bg-dark">
			<div className="cover-container d-flex w-75 p-4 mx-auto flex-column">
				<img className="d-block w-100" src="https://starwars.chocobar.net/star-wars-back0.jpg" 
				alt="Star Wars timeline"/>
			</div>
		</div>
	);
};
