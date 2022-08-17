import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gun } from '../../App';
import { useUserStore } from '../../store';
import { isFileOrImage } from '../../utils/helper';
import Skeleton from '../skeleton/Skeleton';
const SelectConversation = ({ conversationId, name, photoURL, isOnline }) => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [lastMessage, setLastMessage] = useState('No message');
	const { user: accountHolder } = useUserStore();
	const [lastMessageLoading, setLastMessageLoading] = useState(false);
	const [timeMessagesCreated, setTimeMessagesCreated] = useState(0);

	useEffect(() => {
		if (!accountHolder || !conversationId) {
			setLoading(true);
			setLastMessageLoading(true);
		}
		console.log(accountHolder, conversationId);
		gun
			.get('conversations')
			.get(accountHolder.userPub)
			.get(conversationId)
			.once((data) => {
				if (!data) {
					return;
				}
				const { isCreated } = data;
				if (isCreated) {
					setTimeMessagesCreated(isCreated);
				}
			});

		let checkType = null;
		gun
			.get('conversations')
			.get(accountHolder.userPub)
			.get(conversationId)
			.get('messages')
			.map()
			.once((data) => {
				if (!data || data.length === 0) {
					return;
				}
				const { sender, content, createdAt, extension } = data;
				if (createdAt > timeMessagesCreated) {
					setLastMessage(content);
					checkType = isFileOrImage(extension);
					if (checkType === 'message') {
						setLastMessage(content);
					} else if (checkType === 'image') {
						if (accountHolder.userPub === sender) {
							setLastMessage('You sent an image');
						} else {
							setLastMessage('You received an image');
						}
					} else if (checkType === 'file') {
						if (accountHolder.userPub === sender) {
							setLastMessage('You sent a file');
						} else {
							setLastMessage('You received a file');
						}
					}
					setTimeMessagesCreated(createdAt);
					setLastMessageLoading(false);
				}
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (loading) {
		return (
			<div className="flex items-stretch gap-2 px-5 py-2 mb-2 bg-slate-700">
				<Skeleton height="56px" width="56px" borderRadius="9999px" className="flex-shrink-0 " />
				<div className="flex flex-col items-start flex-grow gap-2 py-2">
					<Skeleton height="100%" width="60%" className="flex-grow" />
					<Skeleton height="100%" width="100%" className="flex-grow" />
				</div>
			</div>
		);
	}
	return (
		<Link
			to={`/chat/${conversationId}`}
			className={`hover:bg-light hover:dark:bg-dark-lighten group relative flex items-stretch gap-2 py-3 px-5 transition duration-300 border-b last-of-type:border-0  border-b-dark-green dark:border-b-dark-green-lighter  ${
				conversationId === id ? '!bg-dark-green' : ''
			}`}
		>
			<div className="relative flex-shrink-0 h-14 w-14">
				<img className="object-cover w-full h-full rounded-full" src={photoURL} alt="avatar" />
				<div
					className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${
						isOnline ? 'bg-green-500' : ''
					}  `}
				></div>
			</div>
			<div className="flex flex-col items-start flex-grow gap-1 py-1">
				<p className="max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap">
					{name}
				</p>
				{lastMessageLoading ? (
					<Skeleton className="flex-grow w-2/3" />
				) : (
					<p
						className={`max-w-[240px] flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-sm  ${
							conversationId === id
								? 'text-gray-200 dark:text-light-lighten'
								: 'text-gray-500 dark:text-gray-400'
						}`}
					>
						{lastMessage}
					</p>
				)}
			</div>
		</Link>
	);
};

export default SelectConversation;
