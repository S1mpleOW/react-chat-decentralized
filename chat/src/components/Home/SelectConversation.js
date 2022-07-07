import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from '../skeleton/Skeleton';

const lastMessageLoading = false;

const SelectConversation = ({ conversationId, name, photoURL }) => {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
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
			<img
				className="flex-shrink-0 object-cover rounded-full h-14 w-14"
				// src={IMAGE_PROXY(filtered?.[0]?.data()?.photoURL)}
				src={photoURL}
				alt="avatar"
			/>
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
						Last message
					</p>
				)}
			</div>
		</Link>
	);
};

export default SelectConversation;
