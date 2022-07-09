import React from 'react';

const RightMessage = ({ message }) => {
	return (
		<div className={`group relative flex flex-row-reverse items-stretch gap-2 px-8 mb-2`}>
			<div
				className={`bg-primary after:border-primary relative rounded-lg p-2 text-white after:absolute after:left-full after:bottom-[6px] after:border-8 after:border-t-transparent after:border-r-transparent`}
			>
				<span>{message || ''}</span>
			</div>
		</div>
	);
};

export default RightMessage;
