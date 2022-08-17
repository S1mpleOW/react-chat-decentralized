import React, { useEffect, useState } from 'react';
import { Spin } from 'react-cssfx-loading';
import { useNavigate } from 'react-router-dom';
import { gun } from '../../App';
import { useMessageContext } from '../../contexts/messageContext';
import { useUserStore } from '../../store';
import { createConversation } from '../../utils/helper';

const CreateConversation = ({ handleClickAway }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);
	const { setType } = useMessageContext();
	const { user: accountHolder } = useUserStore();
	// console.log(selected);
	useEffect(() => {
		setIsLoading(true);
		// console.log(accountHolder);

		if (accountHolder) {
			setData([]);
			gun
				.get('users')
				.map()
				.once((user, id) => {
					if (id !== accountHolder?.userPub && user?.name) {
						const userInfo = {
							uid: id,
							displayName: user?.name,
							photoURL: `${process.env.REACT_APP_AVATAR}/${user?.name.slice(0, 2)}.svg`,
						};
						setData((prev) => [...prev, userInfo]);
					}
					// const userId = user && user['_'] && user['_']['#']?.split('/')[1];
					// if (userId !== accountHolder.userPub) {
					// 	gun
					// 		.get(`users`)
					// 		.get(userId)
					// 		.once((user) => {
					// 			console.log(user);
					// 			if (user && user.name) {
					// 				const userInfo = {
					// 					uid: userId,
					// 					displayName: user.name,
					// 					photoURL: `${process.env.REACT_APP_AVATAR}/${user?.name.slice(0, 2)}.svg`,
					// 				};
					// 				setData((prev) => [...prev, userInfo]);
					// 			}
					// 		});
					// }
				});
		}
		setIsLoading(false);
	}, [accountHolder]);

	const handleToggle = (uid) => {
		// if (selected.includes(uid)) {
		// 	setSelected(selected.filter((id) => id !== uid));
		// } else {
		// 	setSelected([...selected, uid]);
		// }
		setSelected([uid]);
	};
	const navigate = useNavigate();
	const handleCreateConversation = () => {
		setIsLoading(true);
		let isExisted = false;
		if (selected && selected.length === 1 && accountHolder.userPub) {
			gun
				.get('conversations')
				.get(accountHolder.userPub)
				.get(selected[0])
				.on((conversation) => {
					if (conversation) {
						isExisted = true;
						if (conversation.isConfirmed === 'pending') {
							setType('pending');
						}
					}
				});
			setIsLoading(false);
			navigate(`/chat/${selected[0]}`);

			setSelected([]);
			handleClickAway(false);
			if (isExisted) {
				// console.log(isExisted);
				return;
			} else {
				// console.log('case2');
				createConversation({ senderId: accountHolder.userPub, receiverId: selected[0] });
			}
		}
	};
	return (
		<div
			onClick={() => handleClickAway(false)}
			className="fixed top-0 left-0 text-white z-20 flex h-full w-full items-center justify-center bg-[#00000080]"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="bg-dark mx-3 w-full max-w-[500px] overflow-hidden rounded-lg"
			>
				{isLoading ? (
					<div className="flex items-center justify-center h-96">
						<Spin color="#0D90F3" />
					</div>
				) : (
					<>
						<div className="flex flex-col items-stretch gap-2 py-2 overflow-y-auto h-96">
							{data?.length > 0 ? (
								data.map((doc) => (
									<div
										key={doc.uid}
										onClick={() => handleToggle(doc.uid)}
										className="flex items-center gap-2 px-5 py-2 transition cursor-pointer hover:bg-dark-lighten"
									>
										<input
											className="flex-shrink-0 cursor-pointer"
											type="checkbox"
											checked={selected.includes(doc.uid)}
											readOnly
										/>
										<img
											className="flex-shrink-0 object-cover w-8 h-8 rounded-full"
											src={doc.photoURL}
											alt=""
										/>
										<p>{doc.displayName}</p>
									</div>
								))
							) : (
								<h3 className="my-3 font-semibold leading-4 text-center">No data to show</h3>
							)}
						</div>
						<div className="flex justify-end p-3 border-t border-dark-lighten">
							<button
								disabled={selected.length === 0}
								onClick={handleCreateConversation}
								className="bg-dark-lighten rounded-lg py-2 px-3 transition duration-300 hover:brightness-125 disabled:!brightness-[80%]"
							>
								Start conversation
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CreateConversation;
