import React from 'react';

const LeftMessage = ({ message }) => {
	return (
		<div className="relative flex items-stretch gap-2 px-8 mb-2 group">
			<div
				onClick={(e) => e.stopPropagation()}
				className={`bg-dark-lighten rounded-lg p-2 text-white 
						 after:border-dark-lighten relative after:absolute after:right-full after:bottom-[6px] after:border-8 after:border-t-transparent after:border-l-transparent`}
			>
				<span>{message || ''}</span>
			</div>
		</div>
	);
};

export default LeftMessage;
