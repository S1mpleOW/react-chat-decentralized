import React from 'react';
import { NavLink } from 'react-router-dom';

const Authen = ({ children }) => {
	return (
		<div className="min-h-screen p-10">
			<div className="container">
				<NavLink
					to="/"
					className="inline-block transition-all duration-500 ease-in-out -translate-x-1/2 ml-[50%]"
				>
					<img
						srcSet="/logo.png 2x"
						alt="monkey-blogging"
						loading="lazy"
						className="mx-auto mb-5"
					/>
				</NavLink>
				<h1 className="text-center text-[40px] font-semibold mb-12">Monkey Message</h1>
				{children}
			</div>
		</div>
	);
};

export default Authen;
