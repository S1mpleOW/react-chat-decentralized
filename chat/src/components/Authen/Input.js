import React from 'react';
import { useController } from 'react-hook-form';

const Input = ({
	name = '',
	control,
	id,
	type = 'text',
	placeholder = '',
	hasIcon = false,
	children,
	className = '',
	...props
}) => {
	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		rules: { required: true },
		defaultValue: '',
	});
	return (
		<div className="relative w-full">
			<input
				className={`w-full ${
					hasIcon ? 'py-5 pl-5 pr-16' : 'p-5'
				} ${className} dark:bg-white bg-light-lighten dark:text-dark outline-none rounded-xl border-2 border-solid border-transparent transition-all duration-300 ease-in-out focus:border-green-primary`}
				type={type}
				placeholder={placeholder}
				id={id ? id : name}
				{...props}
				{...field}
			/>
			{children ? (
				<div className="absolute -translate-y-1/2 cursor-pointer right-5 top-1/2">{children}</div>
			) : null}
		</div>
	);
};

export default Input;
