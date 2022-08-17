import React, { useEffect, useState } from 'react';
import { Spin } from 'react-cssfx-loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gun } from '../App';
import { user } from '../auth';
import { useMessageContext } from '../contexts/messageContext';
import ClickAway from '../pattern/renderProps/ClickAway';
import { useUserStore } from '../store';
import { checkTypeConfirm } from '../utils/helper';
import CreateConversation from './Home/CreateConversation';
import SelectConversation from './Home/SelectConversation';
import UserInfo from './Home/UserInfo';
import AllMessageIcon from './icon/AllMessageIcon';
import PendingMessageIcon from './icon/PendingMessageIcon';

const SideBar = () => {
	const [data, setData] = useState([]);
	const [isDropdownOpened, setIsDropdownOpened] = useState(false);
	const [isUserInfoOpened, setIsUserInfoOpened] = useState(false);
	const [createConversationOpened, setCreateConversationOpened] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user: accountHolder, setUser } = useUserStore();
	const navigate = useNavigate();
	const { type, setType } = useMessageContext();
	const handleSignOut = () => {
		gun.get('users').get(accountHolder.userPub).put({ isOnline: false });
		user.leave((data) => console.log(data));
		setUser(null);
		navigate('/');
	};
	useEffect(() => {
		setLoading(true);
		if (accountHolder && accountHolder.userPub) {
			setData([]);
			console.log(accountHolder);
			gun
				.get('conversations')
				.get(accountHolder.userPub)
				.map()
				.once((conversation, id) => {
					console.log(conversation);
					console.log(id);
					console.log(accountHolder.userPub);
					const conversationId = conversation && conversation['_']['#'].split('/')[2];
					if (conversationId) {
						let expectType = false;
						(async () => {
							expectType = await checkTypeConfirm({
								senderId: accountHolder?.userPub,
								receiverId: conversationId,
							});
							console.log(type, expectType);
							if (!expectType || expectType !== type) {
								return;
							}
							console.log(type, expectType);
							gun
								.get('users')
								.get(conversationId)
								.once((receiver) => {
									if (receiver && receiver.name) {
										setData((prev) => [
											...prev,
											{
												uid: receiver?.pubKey,
												displayName: receiver?.name,
												photoURL: `${process.env.REACT_APP_AVATAR}/${receiver.name}.svg`,
												isOnline: receiver?.isOnline,
											},
										]);
									}
								});
						})();
					}
				});
		}
		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accountHolder.userPub, type]);
	const location = useLocation();
	return (
		<div className="relative">
			<div
				className={`border-dark-green dark:border-dark-green-lighter h-screen flex-shrink-0 overflow-y-auto overflow-x-hidden border-r flex flex-col relative ${
					location.pathname !== '/' ? 'hidden w-[350px] md:!block' : 'w-full md:!w-[350px]'
				}`}
			>
				<div className="flex items-center justify-between px-6 py-5 border-b border-dark-green dark:border-dark-green-lighter">
					<Link to="/" className="flex items-center gap-2">
						<img className="w-8 h-8" srcSet="/logo.png 2x" alt="" />
						<h1 className="text-xl font-bold tracking-[2px] text-dark-green">2M</h1>
					</Link>

					<div className="flex items-center gap-2 ">
						<button
							onClick={() => {
								setType('approved');
								setCreateConversationOpened(true);
							}}
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
										src={
											accountHolder
												? `${process.env.REACT_APP_AVATAR}/${accountHolder?.userName?.slice(
														0,
														2
												  )}.svg`
												: 'https://avatars.dicebear.com/api/bottts/123.svg'
										}
										alt="avatar"
									/>
									<div
										className={`border-dark-green dark:border-dark-green-lighter bg-light-lighten dark:bg-dark absolute top-[calc(100%+10px)] right-0 flex w-max origin-top-right flex-col items-stretch overflow-hidden rounded-md border shadow-lg transition-all duration-200 ${
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
											onClick={handleSignOut}
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

				<div
					className="flex justify-between w-full px-6 py-5 transition-all duration-200 ease-in-out border-b cursor-pointer border-b-dark-green dark:border-b-dark-green-lighter hover:bg-dark-green dark:hover:bg-dark-lighten"
					onClick={() => {
						setType(() => {
							if (type === 'approved') {
								return 'pending';
							}
							return 'approved';
						});
						setData([]);
					}}
				>
					<div>{type === 'pending' ? 'All' : 'Pending'}</div>
					{type === 'pending' ? (
						<AllMessageIcon></AllMessageIcon>
					) : (
						<PendingMessageIcon></PendingMessageIcon>
					)}
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
				{loading ? (
					<div className="flex justify-center my-6">
						<Spin />
					</div>
				) : data?.length === 0 ? (
					<div className="flex flex-col items-center justify-center my-6">
						<p className="text-center">No conversation found</p>
						<button
							onClick={() => {
								setType('approved');
								setCreateConversationOpened(true);
							}}
							className="text-center text-primary"
						>
							Create one
						</button>
					</div>
				) : (
					<div className="flex flex-col">
						{data?.length > 0 &&
							data.map((item) => {
								return (
									<SelectConversation
										key={item.uid}
										photoURL={item.photoURL}
										name={item.displayName}
										conversationId={item.uid}
										isOnline={item.isOnline}
									></SelectConversation>
								);
							})}
					</div>
				)}
			</div>

			{createConversationOpened && (
				<CreateConversation handleClickAway={setCreateConversationOpened}></CreateConversation>
			)}

			<UserInfo isUserInfoOpened={isUserInfoOpened} setIsUserInfoOpened={setIsUserInfoOpened} />
		</div>
	);
};

export default SideBar;
