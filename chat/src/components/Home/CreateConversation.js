import React, { useState } from 'react';
import { Spin } from 'react-cssfx-loading';
import { useNavigate } from 'react-router-dom';
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

const CreateConversation = ({ handleClickAway }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [selected, setSelected] = useState([]);
	const handleToggle = (uid) => {
		if (selected.includes(uid)) {
			setSelected(selected.filter((id) => id !== uid));
		} else {
			setSelected([...selected, uid]);
		}
	};
	const navigate = useNavigate();

	const handleCreateConversation = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			navigate(`/chat/${selected[0].id}`);
		}, 1000);
	};
	return (
		<div
			onClick={() => handleClickAway(false)}
			className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-[#00000080]"
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
							{data.length > 0 &&
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
								))}
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
