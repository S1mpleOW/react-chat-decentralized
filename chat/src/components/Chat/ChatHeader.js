import React, { useState } from 'react';
import Skeleton from '../skeleton/Skeleton';

const ChatHeader = () => {
	const [loading, setLoading] = useState(false);
	return (
		<div className="flex items-center justify-between h-20 px-5 border-b border-dark-lighten">
			<div className="flex items-center flex-grow gap-3">
				{loading ? (
					<Skeleton width="40px" height="40px" radius="100%" />
				) : (
					<>
						<img
							src="https://source.unsplash.com/random"
							className="w-10 h-10 rounded-full"
							alt="avatar"
						/>
						<p>Name</p>
					</>
				)}
			</div>
		</div>
	);
};

export default ChatHeader;
