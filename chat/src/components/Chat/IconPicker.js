import React, { lazy, Suspense } from 'react';
import { Spin } from 'react-cssfx-loading';
import ClickAway from '../../pattern/renderProps/ClickAway';
const Picker = lazy(() => import('./PickEmoji'));

const IconPicker = ({ setIsIconPickerOpened, setInputValue, textInputRef }) => {
	const handleAddIconToInput = (emoji) => {
		const input = textInputRef && textInputRef.current;
		const icon = emoji.native;
		if (!input || !icon) return;
		const start = input?.selectionStart;
		const end = input?.selectionEnd;
		const insertedText = input.value.split('');
		insertedText.splice(start, end - start, emoji?.native);
		setInputValue(insertedText.join(''));
	};
	return (
		<>
			<ClickAway handleClickAway={() => setIsIconPickerOpened(false)}>
				{(ref) => (
					<div ref={ref} className="absolute right-0 bottom-full">
						<Suspense
							fallback={
								<div className="flex h-[357px] w-[348px] items-center justify-center rounded-lg border-2 border-[#555453] bg-[#222222]">
									<Spin />
								</div>
							}
						>
							<Picker onEmojiSelect={(emoji) => handleAddIconToInput(emoji)} />
						</Suspense>
					</div>
				)}
			</ClickAway>
		</>
	);
};

export default IconPicker;
