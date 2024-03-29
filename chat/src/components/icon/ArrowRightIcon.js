import React from 'react';

const ArrowRightIcon = ({ className = '', onClick = () => {}, ...props }) => {
	return (
		<span className={className} onClick={onClick} {...props}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="w-6 h-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2}
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
			</svg>
		</span>
	);
};

export default ArrowRightIcon;
