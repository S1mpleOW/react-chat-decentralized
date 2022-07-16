import React from 'react';

const Label = ({ htmlFor, children, className, ...props }) => {
	return (
		<div htmlFor={htmlFor} className={`${className} cursor-pointer font-semibold`} {...props}>
			{children}
		</div>
	);
};

export default Label;
