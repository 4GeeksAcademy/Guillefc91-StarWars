import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Favorite } from "./Favorite.jsx";


export const Navbar = () => {
	const { store, actions } = useContext(Context)
	return (
		<nav className="navbar navbar-dark bg-black ">
			<div className="container-fluid d-flex justify-content-between ">
				<div>
					<Link className="navbar-brand" to="/">
						<img height="62" src="https://starwars.chocobar.net/star-wars-logo.png" />
					</Link>
				</div>
				<div>
					<ul className="nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link link-secondary" to="/characters">Characters</Link>
						</li>
						
						<li className="nav-item">
							<Link className="nav-link link-secondary" to="/planets">Planets</Link></li>
						<li className="nav-item">
							<Link className="nav-link link-secondary" to="/starships">Starships</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link link-secondary" to="/contacts">Contacts</Link>
						</li>
						<li className="nav-item">
							<Favorite/>
						</li>
						<li className="nav-item">
							<Link className="nav-link link-success" to="/login">Login</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link link-primary" to="/signup">Sing Up</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
