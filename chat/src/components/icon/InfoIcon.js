import React from 'react';

const InfoIcon = ({ className = '', onClick = () => {}, ...props }) => {
	return (
		<span className={`${className} text-primary`} onClick={onClick} {...props}>
			<i className="text-2xl bx bxs-info-circle "></i>
		</span>
	);
};

export default InfoIcon;
