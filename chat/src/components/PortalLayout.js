import React from 'react';

const PortalLayout = ({ isOpened, setIsOpened = () => {}, children }) => {
	return (
		<div
			onClick={() => setIsOpened(false)}
			className={`animate-fade-in fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080] transition-all duration-500 cursor-pointer ${
				isOpened ? 'fixed' : 'hidden'
			}`}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="bg-dark mx-2 w-full max-w-[500px] rounded-lg transition-all duration-300 ease-in-out"
			>
				{children}
			</div>
		</div>
	);
};

export default PortalLayout;
