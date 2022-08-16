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
import { useUserStore } from '../store';
import { gun } from '../App';

const schema = yup.object().shape({
	username: yup.string().required('Username is required'),
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
		setError,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});

	const { setUser } = useUserStore();

	const onSubmit = (data) => {
		user.auth(data.username, data.password, (ack) => {
			console.log(ack);
			if (ack.err) {
				setError('password', {
					message: ack.err,
				});
				return null;
			}
			const userInfo = {
				userName: data.username,
				userPub: ack?.sea?.pub, //public key
				// userPri: ack?.sea?.priv, //private key
			};
			console.log('🚀 ~ file: SignIn.js ~ line 55 ~ user.auth ~ userInfo', userInfo);
			reset({ username: '', password: '' });
			gun.get('users').get(userInfo.userPub).put({
				isOnline: true,
			});

			setUser(userInfo);
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
					<div className="flex gap-2 ml-auto">
						<span>Doesn't have any account?</span>
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
					disabled={!isValid || isSubmitting}
					isLoading={isSubmitting}
				>
					Sign in
				</Button>
			</form>
		</Authen>
	);
};

export default SignIn;
