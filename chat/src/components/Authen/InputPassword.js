import React from 'react';
import EyeInvisibleIcon from '../icon/EyeInvisibleIcon';
import EyeVisibleIcon from '../icon/EyeVisibleIcon';
import Input from './Input';

const InputPassword = ({ control, ...props }) => {
	const [showPassword, setShowPassword] = React.useState(false);
	if (!control) return null;
	return (
		<React.Fragment>
			<Input
				type={showPassword ? 'text' : 'password'}
				name="password"
				id="password"
				className="input"
				placeholder="Enter your password"
				control={control}
				{...props}
			>
				{!showPassword ? (
					<EyeInvisibleIcon
						className="text-dark-green"
						onClick={() => setShowPassword(!showPassword)}
					/>
				) : (
					<EyeVisibleIcon
						className="text-dark-green"
						onClick={() => setShowPassword(!showPassword)}
					/>
				)}
			</Input>
		</React.Fragment>
	);
};

export default InputPassword;
