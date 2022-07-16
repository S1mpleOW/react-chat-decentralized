import React, { Fragment, useEffect, useState } from 'react';
import { Spin } from 'react-cssfx-loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { gun } from '../../App';
import { useMessageContext } from '../../contexts/messageContext';
import LeftMessage from './LeftMessage';
import RightMessage from './RightMessage';

const ChatWindow = ({ inputSectionOffset = 0 }) => {
	const [limitCount, setLimitCount] = useState(10);
	const conversationId = useParams();
	const {
		state: { messages },
		dispatch,
	} = useMessageContext();
	useEffect(() => {
		if (!conversationId) return;
		gun
			.get('messages-room1')
			.map()
			.once((data, id) => {
				if (data.length === 0) return;
				const { sender, receiver, message, createdAt } = data;
				dispatch({
					type: 'GET_MESSAGES',
					payload: {
						id,
						messages: { sender, message, receiver, createdAt },
					},
				});
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const size = messages && messages.length;
	return (
		<InfiniteScroll
			next={() => setLimitCount((prev) => prev + 10)}
			hasMore={size >= limitCount}
			inverse
			dataLength={size || 0}
			loader={
				<div className="flex justify-center py-3">
					<Spin />
				</div>
			}
			style={{ display: 'flex', flexDirection: 'column-reverse' }}
			height={`calc(100vh - ${144 + inputSectionOffset}px)`} //inputSectionOffset
		>
			<div className="flex flex-col items-stretch pt-4 pb-1">
				{messages &&
					messages.length > 0 &&
					messages.map((message, id) => {
						if (message.sender === '1') {
							return <RightMessage key={id} message={message?.message} />;
						} else {
							return <LeftMessage key={id} message={message?.message} />;
						}
					})}
				{/* <LeftMessage message="Hello" />
				<RightMessage message="Hello" />
				<LeftMessage message="Hello" />
				<RightMessage message="Hello" />
				<LeftMessage message="Hello" />
				<RightMessage message="Hello" />
				<LeftMessage message="Hello" />
				<RightMessage message="Hello" />
				<LeftMessage message="Hello" />
				<RightMessage message="Hello" />
				<LeftMessage message="Hello" />
				<RightMessage message="Hello" />
				<LeftMessage message="Hello" />
				<RightMessage message="Hello" />
				<LeftMessage message="Hello" />
				<RightMessage message="Hello" />
				<LeftMessage message="Hello" />
				<RightMessage message="Hello" />
				<LeftMessage message="Hello" />
				<RightMessage message="Hello" />
				<RightMessage message="Hello" />
				<RightMessage message="Hello" /> */}

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
