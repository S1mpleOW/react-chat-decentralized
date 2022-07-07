import React from 'react';

const Toggle = ({ on, onClick, ...rest }) => {
	return (
		<>
			<input type="checkbox" checked={on} className="hidden-input" onChange={() => {}} />
			<div
				className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all bg-dark-green dark:bg-dark-green`}
				onClick={onClick}
				{...rest}
			>
				<span
					className={`transition-all w-[34px] h-[34px]  rounded-full inline-block bg-light dark:bg-dark-lighten ${
						on ? 'translate-x-[28px]' : ''
					}`}
				></span>
			</div>
		</>
	);
};

export default Toggle;
