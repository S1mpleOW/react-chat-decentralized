import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gun } from '../../App';
import { useTheme } from '../../contexts/themeContext';
import { useUserStore } from '../../store';
import { THEMES } from '../../utils/constants';

const ConversationSetting = ({ setIsOpened, setMediaViewOpened }) => {
	const [isChangeThemeOpened, setIsChangeThemeOpened] = useState(false);
	const { theme: conversationTheme, setTheme } = useTheme();
	const { user } = useUserStore();
	const { id } = useParams();
	useEffect(() => {
		if (!user || !id) return;
		gun
			.get('conversations')
			.get(user.userPub)
			.get(id)
			.once((data) => {
				console.log(data);
				if (!data || !data.theme) {
					setTheme(THEMES[0] || '#0D90F3');
					return;
				}
				setTheme(data.theme);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, id]);
	const handleChangeTheme = (theme) => {
		console.log(theme);
		setTheme(theme);
		gun.get('conversations').get(user.userPub).get(id).put({
			theme,
		});
		setIsChangeThemeOpened(false);
		setIsOpened(false);
	};
	return (
		<>
			<div className="flex items-center justify-between px-3 py-3 border-b border-primary">
				<div className="flex-1"></div>
				<div className="flex items-center justify-center flex-1">
					<h1 className="text-2xl text-center whitespace-nowrap text-dark-green-lighter">
						Conversation settings
					</h1>
				</div>
				<div className="flex items-center justify-end flex-1">
					<button
						onClick={() => setIsOpened(false)}
						className="flex items-center justify-center w-8 h-8 rounded-full bg-dark-lighten"
					>
						<i className="text-2xl bx bx-x text-dark-green-lighter"></i>
					</button>
				</div>
			</div>
			<div className="flex flex-col items-stretch text-primary">
				<div className={`w-full ${!isChangeThemeOpened ? 'border-b border-primary' : ''}`}>
					<button
						onClick={() => setIsChangeThemeOpened((prev) => !prev)}
						className="flex items-center justify-between w-full gap-3 px-4 py-3 transition-all duration-300 rounded-lg bg-dark hover:brightness-125"
					>
						<div className="flex items-center gap-3">
							<i className="text-2xl bx bx-palette"></i>
							<span>Change theme</span>
						</div>
						<i
							className={`bx bx-chevron-down text-3xl ${isChangeThemeOpened ? 'rotate-180' : ''}`}
						></i>
					</button>
				</div>
				<div
					className={`${
						isChangeThemeOpened ? 'border-b border-primary block' : ' hidden'
					} transition-all duration-300 ease-in-out`}
				>
					<div className="flex flex-wrap gap-3 p-4">
						{THEMES.map((theme) => (
							<div
								key={theme}
								style={{ background: theme }}
								onClick={() => handleChangeTheme(theme)}
								className={`h-14 w-14 cursor-pointer rounded-full transition-all duration-300 ease-in-out hover:brightness-125 ${
									conversationTheme === theme ? 'check-overlay' : ''
								}`}
							></div>
						))}
					</div>
				</div>
				<div className="w-full">
					<button
						onClick={() => {
							setIsOpened(false);
							setMediaViewOpened(true);
						}}
						className="flex items-center w-full gap-3 px-4 py-3 transition duration-300 rounded-lg bg-dark hover:brightness-125"
					>
						<i className="text-2xl bx bxs-file"></i>
						<span>View images & files</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default ConversationSetting;
