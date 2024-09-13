import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer py-3 bg-body-tertiary text-center bg-black">
		<p className="text-secondary">Made with <i className="fa fa-heart text-danger"></i>
			{ `  by  `}
			<Link className="text-secondary" to="https://github.com/Guillefc91" target="_blank">Guillermo Fernández</Link>
			 {`  and  `}
			<Link className="text-secondary" to="https://4geeksacademy.com" target="_blank"> 4Geeks Academy </Link>
		</p>
	</footer>
);
