import React from 'react';
import { toast } from 'react-toastify';
import { useUserStore } from '../../store';

const UserInfo = ({ isUserInfoOpened = false, setIsUserInfoOpened = () => {} }) => {
	const { user } = useUserStore();
	return (
		<div
			onClick={() => setIsUserInfoOpened(false)}
			className={`fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080] transition-all duration-300 text-white ${
				isUserInfoOpened ? 'visible opacity-100' : 'invisible opacity-0'
			}`}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="bg-dark mx-2 w-full max-w-[400px] rounded-lg"
			>
				<div className="flex items-center justify-between px-3 py-3 border-b border-dark-lighten">
					<div className="flex-1"></div>
					<div className="flex items-center justify-center flex-1">
						<h1 className="text-2xl text-center whitespace-nowrap">Your Profile</h1>
					</div>
					<div className="flex items-center justify-end flex-1">
						<button
							onClick={() => setIsUserInfoOpened(false)}
							className="flex items-center justify-center w-8 h-8 rounded-full bg-dark-lighten"
						>
							<i className="text-2xl bx bx-x"></i>
						</button>
					</div>
				</div>
				<div className="p-6">
					<div className="flex gap-4">
						<img
							className="object-cover w-16 h-16 rounded-full"
							// src={IMAGE_PROXY(currentUser?.photoURL as string)}
							src={`${process.env.REACT_APP_AVATAR}/${user.userName}.svg`}
							alt="avatar"
						/>
						<div className="flex flex-col gap-2">
							<h1 className="text-xl">{user?.userName}</h1>
							<p>Email: {user?.userName}@gmail.com</p>
						</div>
					</div>

					<div className="flex items-center gap-2 mt-4">
						<button className="flex items-center justify-center w-1/2 h-full p-3 font-semibold transition-all duration-500 ease-in-out border border-transparent rounded-lg bg-dark-green hover:bg-transparent hover:border-dark-green ">
							<i className="bx bx-edit"></i>
							<span
								onClick={() => {
									toast.warn('Not implemented yet!');
								}}
								className="ml-2"
							>
								Edit Profile
							</span>
						</button>
						<button className="flex items-center justify-center w-1/2 h-full p-3 font-semibold transition-all duration-300 ease-in-out border border-transparent rounded-lg bg-dark-lighten dark:bg-dark-lighten hover:border hover:border-dark-green">
							<i className="bx bx-log-out"></i>
							<span className="ml-2">Logout</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
