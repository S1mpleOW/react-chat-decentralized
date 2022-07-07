import { Picker } from 'emoji-mart';
import data from '@emoji-mart/data';
import { useEffect, useRef } from 'react';
const defaultConfig = {
	set: 'facebook',
	enableFrequentEmojiSort: true,
	theme: 'dark',
	showPreview: false,
	showSkinTones: false,
	emojiTooltip: true,
	defaultSkin: 1,
	color: '#0F8FF3',
};
const PickEmoji = ({ onEmojiSelect = () => {}, ...props }) => {
	const ref = useRef(null);
	useEffect(() => {
		new Picker({ data, ref, onEmojiSelect, props: { ...defaultConfig, ...props } });
	}, []);
	return <div ref={ref}></div>;
};

export default PickEmoji;
