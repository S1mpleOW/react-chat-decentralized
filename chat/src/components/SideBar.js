import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkmode } from '../contexts/darkmodeContext';
import ClickAway from '../pattern/renderProps/ClickAway';
import CreateConversation from './Home/CreateConversation';
import SelectConversation from './Home/SelectConversation';
import UserInfo from './Home/UserInfo';
import Toggle from './toggle/Toggle';
const data = [
	{
		uid: '1',
		displayName: 'John Doe',
		photoURL: `https://randomuser.me/api/portraits/men/${Math.ceil(Math.random() * 100)}.jpg`,
	},
	{
		uid: '2',
		displayName: 'John Smith',
		photoURL: `https://randomuser.me/api/portraits/men/${Math.ceil(Math.random() * 100)}.jpg`,
	},
	{
		uid: '3',
		displayName: 'Karol Smith',
		photoURL: `https://randomuser.me/api/portraits/men/${Math.ceil(Math.random() * 100)}.jpg`,
	},
];
const SideBar = () => {
	const [isDropdownOpened, setIsDropdownOpened] = useState(false);
	const [isUserInfoOpened, setIsUserInfoOpened] = useState(false);
	const [createConversationOpened, setCreateConversationOpened] = useState(false);

	const location = useLocation();
	const { darkmode, setDarkmode } = useDarkmode();
	return (
		<div className="relative">
			<div className="absolute bottom-0 right-0 z-10 inline-block m-3 ">
				<Toggle on={darkmode} onClick={() => setDarkmode(!darkmode)}></Toggle>
			</div>
			<div
				className={`border-dark-green dark:border-dark-green-lighter h-screen flex-shrink-0 overflow-y-auto overflow-x-hidden border-r flex flex-col relative ${
					location.pathname !== '/' ? 'hidden w-[350px] md:!block' : 'w-full md:!w-[350px]'
				}`}
			>
				<div className="flex items-center justify-between h-20 px-6 border-b border-dark-green dark:border-dark-green-lighter">
					<Link to="/" className="flex items-center gap-2">
						<img className="w-8 h-8" srcSet="/logo.png 2x" alt="" />
						<h1 className="text-xl font-bold tracking-[4px] text-dark-green">2M</h1>
					</Link>

					<div className="flex items-center gap-2">
						<button
							onClick={() => setCreateConversationOpened(true)}
							className="w-8 h-8 text-white rounded-full bg-dark-green"
						>
							<i className="text-xl bx bxs-edit"></i>
						</button>

						<ClickAway handleClickAway={() => setIsDropdownOpened(false)}>
							{(propsRef) => (
								<div ref={propsRef} className="relative z-10">
									<img
										onClick={() => setIsDropdownOpened((prev) => !prev)}
										className="object-cover w-8 h-8 rounded-full cursor-pointer"
										// src={currentUser?.photoURL ? IMAGE_PROXY(currentUser.photoURL) : DEFAULT_AVATAR}
										src="https://source.unsplash.com/random"
										alt="avatar"
									/>
									<div
										className={`border-dark-green dark:border-dark-green-lighter bg-light-lighten dark:bg-dark absolute top-[calc(100%+10px)] right-0 flex w-max origin-top-right flex-col items-stretch overflow-hidden rounded-md border  shadow-lg transition-all duration-200 ${
											isDropdownOpened
												? 'visible scale-100 opacity-100'
												: 'invisible scale-0 opacity-0'
										}`}
									>
										<button
											onClick={() => {
												setIsUserInfoOpened(true);
												setIsDropdownOpened(false);
											}}
											className="flex items-center gap-1 px-3 py-2 transition duration-300 hover:bg-light dark:hover:bg-dark-lighten"
										>
											<i className="text-xl bx bxs-user"></i>
											<span className="whitespace-nowrap">Profile</span>
										</button>
										<button
											// onClick={() => signOut(auth)}
											className="flex items-center gap-1 px-3 py-2 transition duration-300 hover:bg-light dark:hover:bg-dark-lighten"
										>
											<i className="text-xl bx bx-log-out"></i>
											<span className="whitespace-nowrap">Sign Out</span>
										</button>
									</div>
								</div>
							)}
						</ClickAway>
					</div>
				</div>

				{/* {loading ? (
			<div className="flex justify-center my-6">
				<Spin />
			</div>
		) : error ? (
			<div className="flex justify-center my-6">
				<p className="text-center">Something went wrong</p>
			</div>
		) : data?.empty ? (
			<div className="flex flex-col items-center justify-center my-6">
				<p className="text-center">No conversation found</p>
				<button
					onClick={() => setCreateConversationOpened(true)}
					className="text-center text-primary"
				>
					Create one
				</button>
			</div>
		) : (
			<div>
				{data?.docs.map((item) => (
					<SelectConversation
						key={item.id}
						conversation={item.data() as ConversationInfo}
						conversationId={item.id}
					/>
				))}
			</div>
		)} */}
				<div className="flex flex-col">
					{data.length > 0 &&
						data.map((item) => {
							return (
								<SelectConversation
									key={item.uid}
									photoURL={item.photoURL}
									name={item.displayName}
									conversationId={item.uid}
								></SelectConversation>
							);
						})}
				</div>
			</div>

			{createConversationOpened && (
				<CreateConversation handleClickAway={setCreateConversationOpened}></CreateConversation>
			)}

			<UserInfo isUserInfoOpened={isUserInfoOpened} setIsUserInfoOpened={setIsUserInfoOpened} />
		</div>
	);
};

export default SideBar;
