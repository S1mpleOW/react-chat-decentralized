import React from 'react';
import Field from '../components/Authen/Field';
import Input from '../components/Authen/Input';
import Label from '../components/Authen/Label';
import Authen from './Authen';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputPassword from '../components/Authen/InputPassword';
import { NavLink } from 'react-router-dom';
import Button from '../components/Authen/Button';

const schema = yup.object().shape({
	email: yup.string().email('Email is valid').required('Email is required'),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),
});

const SignIn = () => {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid, errors },
		reset,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<Authen>
			<form autoComplete="off" className="group" onSubmit={handleSubmit(onSubmit)}>
				<Field className="field">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						name="email"
						id="email"
						placeholder="Enter your email"
						control={control}
					/>
					{errors && errors.email && (
						<span className="text-base font-bold text-red-500">{errors?.email?.message || ''}</span>
					)}
				</Field>
				<Field className="field">
					<Label htmlFor="password">Password</Label>
					<InputPassword control={control}></InputPassword>
					{errors && errors.password && (
						<span className="text-base font-bold text-red-500">
							{errors?.password?.message || ''}
						</span>
					)}
				</Field>
				<Field className="field">
					<div className="flex gap-2 ml-auto">
						<span>Have you registered account?</span>
						<NavLink to={`/sign-up`}>
							<div className="transition-all text-green-primary hover:text-dark-green-lighter">
								Register
							</div>
						</NavLink>
					</div>
				</Field>
				<Button
					type="submit"
					style={{
						maxWidth: 600,
						margin: '0 auto',
						height: '66px',
					}}
					isLoading={isSubmitting}
				>
					Sign in
				</Button>
			</form>
		</Authen>
	);
};

export default SignIn;
