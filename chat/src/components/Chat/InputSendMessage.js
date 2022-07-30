import React, { forwardRef } from 'react';

const InputSendMessage = (
	{
		name = '',
		control,
		id,
		type = 'text',
		placeholder = '',
		children,
		className = '',
		value,
		...props
	},
	ref
) => {
	return (
		<input
			ref={ref}
			name={name}
			type={type}
			value={value}
			placeholder={placeholder}
			className={`w-full pl-3 pr-10 dark:text-white rounded-full outline-none dark:bg-dark-lighten bg-slate-200 h-9 ${className}`}
			id={id ? id : name}
			{...props}
		>
			{children}
		</input>
	);
};

export default forwardRef(InputSendMessage);
