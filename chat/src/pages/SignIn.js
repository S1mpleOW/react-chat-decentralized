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

import { user } from '../auth'


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
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
    	console.log("🚀 ~ file: SignIn.js ~ line 43 ~ onSubmit ~ data", data)
		
		user.auth(data.username, data.password, (ack) => {
			if(ack.err) {
				alert(`LOGIN FAILED \n${ack.err}`)
				return
			}
            console.log("🚀 ~ file: SignIn.js ~ line 44 ~ user.auth ~ ack", ack)
			console.log('public key user login creates: ', ack.sea.pub)
			
			// console.log(user)
		})
		
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
						<span className="text-base font-bold text-red-500">{errors?.username?.message || ''}</span>
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
					isLoading={isSubmitting}
				>
					Sign in
				</Button>
			</form>
		</Authen>
	);
};

export default SignIn;
