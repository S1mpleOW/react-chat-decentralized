import React, { Fragment, useEffect, useState } from 'react';
import { Spin } from 'react-cssfx-loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { gun } from '../../App';
import { useMessageContext } from '../../contexts/messageContext';
import { useUserStore } from '../../store';
import LeftMessage from './LeftMessage';
import RightMessage from './RightMessage';

const ChatWindow = ({ inputSectionOffset = 0 }) => {
	const [limitCount, setLimitCount] = useState(10);
	const conversationId = useParams();
	const { user } = useUserStore();
	const {
		state: { messages },
		dispatch,
	} = useMessageContext();
	useEffect(() => {
		if (!conversationId || !user) return;
		gun
			.get('messages-room1')
			.map()
			.once((data, id) => {
				if (!data || data.length === 0) return;
				const { sender, receiver, content, messageType, createdAt, name, extension } = data;
				dispatch({
					type: 'GET_MESSAGES',
					payload: {
						id,
						messages: { sender, content, messageType, receiver, createdAt, name, extension },
					},
				});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const size = messages && messages.length;
	console.log(messages);
	return (
		<InfiniteScroll
			next={() => setLimitCount((prev) => prev + 10)}
			hasMore={size >= limitCount}
			inverse
			dataLength={size || 0}
			loader={
				<div className="flex justify-center py-3 mb-14">
					<Spin />
				</div>
			}
			style={{ display: 'flex', flexDirection: 'column-reverse' }}
			height={`calc(100vh - ${144 + inputSectionOffset}px)`}
		>
			<div className="flex flex-col items-stretch pt-4 pb-2">
				{messages &&
					messages.length > 0 &&
					messages.map((data, id) => {
						if (`${data?.sender}` === `${user?.userId}`) {
							console.log(user);
							return (
								<RightMessage
									key={id}
									message={{
										type: data.messageType,
										content: data.content,
										name: data.name,
										extension: data.extension,
									}}
								/>
							);
						} else {
							return (
								<LeftMessage
									key={id}
									message={{
										type: data.messageType,
										content: data.content,
										name: data.name,
										extension: data.extension,
									}}
								/>
							);
						}
					})}

				{/* {Object.entries(conversation.seen).filter(
							([key, value]) => key !== currentUser?.uid && value === item.id
						).length > 0 && (
							<div className="flex justify-end gap-[1px] px-8">
								{Object.entries(conversation.seen)
									.filter(
										([key, value]) =>
											key !== currentUser?.uid && value === item.id
									)
									.map(([key, value]) => (
										<AvatarFromId key={key} uid={key} size={14} />
									))}
							</div>
		          )} */}
				{/* <div ref={scrollBottomRef}></div> */}
			</div>
		</InfiniteScroll>
	);
};

export default ChatWindow;
