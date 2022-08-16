import React from 'react';

const InfoIcon = ({ className = '', onClick = () => {}, ...props }) => {
	return (
		<span className={`${className}`} onClick={onClick} {...props}>
			<i className="text-2xl bx bxs-info-circle text-primary"></i>
		</span>
	);
};

export default InfoIcon;
