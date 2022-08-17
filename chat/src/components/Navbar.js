import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className="container-fluid min-h-[64px] flex items-center border-b border-dark-green ">
			<Link to="/">
				<img className="w-12 h-12" srcSet="/logo.png 3x" alt="logo" />
			</Link>
			<div className="ml-auto mr-16">
				<div className="flex items-center gap-5">
					<Link to="/sign-in" className="">
						Sign in
					</Link>
					<Link
						to="/sign-up"
						className="px-4 py-2 rounded-full cursor-pointer button-sign-up bg-dark-green"
					>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
