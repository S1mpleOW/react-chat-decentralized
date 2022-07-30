import React, { useState } from 'react';
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

import { user } from '../auth';
import { setGunUsers } from '../utils/helper';

const schema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),
	passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = () => {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid, errors },
		reset,
		setError,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			username: '',
			password: '',
			passwordConfirm: '',
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		console.log('🚀 ~ file: SignUp.js ~ line 43 ~ onSubmit ~ data', data);

		user.create(data.username, data.password, (ack) => {
			console.log(ack);
			if (ack.err) {
				setError('passwordConfirm', {
					message: ack.err,
				});
				return;
			}
			const user = {
				name: data.username,
				pubKey: ack.pub,
				isOnline: false,
			};
			setGunUsers(user);

			reset({ username: '', password: '', passwordConfirm: '' });
			return;
		});
	};

	return (
		<Authen>
			<form autoComplete="off" className="group" onSubmit={handleSubmit(onSubmit)}>
				<Field className="field">
					<Label htmlFor="Username">Username</Label>
					<Input
						type="text"
						name="username"
						id="username"
						placeholder="Enter your username"
						control={control}
					/>
					{errors && errors.username && (
						<span className="text-base font-bold text-red-500">
							{errors?.username?.message || ''}
						</span>
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
					<Label htmlFor="password">Reenter password</Label>
					<InputPassword
						name="passwordConfirm"
						id="passwordConfirm"
						control={control}
					></InputPassword>
					{errors && errors.passwordConfirm && (
						<span className="text-base font-bold text-red-500">
							{errors?.passwordConfirm?.message || ''}
						</span>
					)}
				</Field>

				<Field className="field">
					<div className="flex gap-2 ml-auto">
						<span>Already registerd ?</span>
						<NavLink to={`/sign-in`}>
							<div className="transition-all text-green-primary hover:text-dark-green-lighter">
								Sign in
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
					disabled={isSubmitting || !isValid}
					isLoading={isSubmitting}
				>
					Create new account
				</Button>
			</form>
		</Authen>
	);
};

export default SignUp;
