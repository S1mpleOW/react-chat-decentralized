import React from 'react';

const Toggle = ({ on, onClick, ...rest }) => {
	return (
		<>
			<input type="checkbox" checked={on} className="hidden-input" onChange={() => {}} />
			<div
				className={`inline-block w-[50px] h-[20px] relative cursor-pointer rounded-full transition-all bg-dark-green dark:bg-dark-green`}
				onClick={onClick}
				{...rest}
			>
				<span
					className={`transition-all duration-300 ease-in-out w-[16px] h-[16px] absolute top-[2px] left-[2px] rounded-full inline-block bg-light dark:bg-dark-lighten indicator overflow-hidden ${
						on ? 'after:bg-dark-green left-[calc(50px-18px)] rotate-180' : ''
					}`}
				></span>
			</div>
		</>
	);
};

export default Toggle;
