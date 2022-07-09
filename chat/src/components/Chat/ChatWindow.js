import React, { Fragment, useState } from 'react';
import { Spin } from 'react-cssfx-loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import LeftMessage from './LeftMessage';
import RightMessage from './RightMessage';

const data = {
	size: 20,
};

const ChatWindow = ({ inputSectionOffset = 0 }) => {
	const [limitCount, setLimitCount] = useState(10);
	console.log(limitCount);
	return (
		<InfiniteScroll
			dataLength={data?.size}
			next={() => setLimitCount(limitCount + 10)}
			inverse
			hasMore={data?.size >= limitCount}
			loader={
				<div className="flex justify-center py-3">
					<Spin />
				</div>
			}
			endMessage={
				<p style={{ textAlign: 'center' }}>
					<b>Yay! You have seen it all</b>
				</p>
			}
			style={{ display: 'flex', flexDirection: 'column-reverse' }}
			height={`calc(100vh - ${144 + inputSectionOffset}px)`} //inputSectionOffset
		>
			<div className="flex flex-col items-stretch gap-3 pt-10 pb-1">
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
				<LeftMessage message="Hello" />
				<RightMessage message="Hello" />
				<RightMessage message="Hello" />
				<RightMessage message="Hello" />

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
		// <div className="flex flex-col items-stretch flex-grow gap-3 pt-10 pb-1">
		// 	<div className="mt-auto">
		// 		<RightMessage messages={'Hello world'}></RightMessage>
		// 		<LeftMessage messages={'Hello world'}></LeftMessage>
		// 		<RightMessage messages={'Hello world'}></RightMessage>
		// 		<LeftMessage messages={'Hello world'}></LeftMessage>
		// 		<RightMessage messages={'Hello world'}></RightMessage>
		// 		<LeftMessage messages={'Hello world'}></LeftMessage>
		// 		<RightMessage messages={'Hello world'}></RightMessage>
		// 	</div>
		// </div>
	);
};

export default ChatWindow;
