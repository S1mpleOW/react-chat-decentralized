import React from 'react';
import { Spin } from 'react-cssfx-loading';
import { NavLink } from 'react-router-dom';

const className =
	'flex items-center justify-center w-full px-6 text-base font-semibold text-white transition-all duration-300 ease-in-out border-none rounded-lg cursor-pointer disabled:opacity-50 bg-gradient-to-r from-green-primary to bg-green-secondary active:scale-95 hover:opacity-80 disabled:cursor-not-allowed';
const Button = ({
	type = 'button',
	onClick = () => {},
	isLoading = false,
	to,
	children,
	...props
}) => {
	const child = isLoading ? <Spin /> : children;
	if (to && typeof to === 'string') {
		return (
			<NavLink to={to} style={{ display: 'inline-block' }}>
				<button className={`${className}`} type={type} disabled={isLoading} {...props}>
					{child}
				</button>
			</NavLink>
		);
	}
	return (
		<button className={className} type={type} onClick={onClick} disabled={isLoading} {...props}>
			{child}
		</button>
	);
};

export default Button;
