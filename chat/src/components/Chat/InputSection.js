import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Spin } from 'react-cssfx-loading';
import { useParams } from 'react-router-dom';
// import { useMessageContext } from '../../contexts/messageContext';
import ClickAway from '../../pattern/renderProps/ClickAway';
import getIcon from '../../utils/constants';
import { getFileName } from '../../utils/helper';
import Gun from 'gun';
const Picker = lazy(() => import('./PickEmoji'));

const gun = new Gun({
	peers: ['http://localhost:4000/gun'],
});
let i = 0;
const InputSection = ({ setInputSectionOffset, disabled }) => {
	const [fileDragging, setFileDragging] = useState(false);
	const [previewFiles, setPreviewFiles] = useState([]);
	const [fileUploading, setFileUploading] = useState(false);
	const [isIconPickerOpened, setIsIconPickerOpened] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const textInputRef = useRef(null);
	const imageInputRef = useRef(null);
	const fileInputRef = useRef(null);

	// const { state, dispatch } = useMessageContext();
	// console.log(state);
	const conversationId = useParams();
	const checkFileExists = useCallback(
		(file) => {
			if (!file) return;
			let { name, size, type, lastModified } = file;
			const isExisted =
				previewFiles.length > 0 &&
				previewFiles.some(
					(file) =>
						file.name === name &&
						file.lastModified === lastModified &&
						file.size === size &&
						file.type === type
				);
			return isExisted;
		},
		[previewFiles]
	);
	useEffect(() => {
		textInputRef.current?.focus();
	}, [conversationId]);

	useEffect(() => {
		const dragBlurHandler = (e) => {
			e.preventDefault();
			e.stopPropagation();
			setFileDragging(false);
		};

		const dragFocusHandler = (e) => {
			e.preventDefault();
			e.stopPropagation();
			setFileDragging(true);
		};

		const dropFileHandler = async (e) => {
			e.preventDefault();
			e.stopPropagation();

			setFileDragging(false);

			let items = e.dataTransfer.items;
			let files = e.dataTransfer.files;

			let selectedFiles = [];

			for (let i = 0, item; (item = items[i]); i++) {
				let entry = item.webkitGetAsEntry();
				if (entry.isFile) {
					const isExisted = checkFileExists(files[i]);
					if (!isExisted) {
						selectedFiles.push(files[i]);
					}
				}
			}
			setPreviewFiles((prev) => [...prev, ...selectedFiles]);
		};

		window.addEventListener('dragenter', dragFocusHandler);
		window.addEventListener('dragover', dragFocusHandler);
		window.addEventListener('dragleave', dragBlurHandler);
		window.addEventListener('drop', dropFileHandler);

		/* Removing the event listeners. */
		return () => {
			window.removeEventListener('dragenter', dragFocusHandler);
			window.removeEventListener('dragover', dragFocusHandler);
			window.removeEventListener('dragleave', dragBlurHandler);
			window.removeEventListener('drop', dropFileHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [previewFiles]);

	useEffect(() => {
		if (!setInputSectionOffset) return;
		if (previewFiles.length > 0) return setInputSectionOffset(128);
		setInputSectionOffset(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [previewFiles.length]);
	console.log('re-render');
	useEffect(() => {
		let messages = [];
		gun
			.get('messages-room1')
			.map()
			.once((data) => {
				const id = data['_']['#'];
				if (!messages[id]) messages[id] = data?.messages;
				console.log(messages);
			});
	}, []);

	const handleFileInputChange = (e) => {
		console.log(e.target);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const messages = e.target.elements['messages']?.value;
		console.log(messages);
		if (messages) {
			// dispatch({
			// 	type: 'ADD_MESSAGE',
			// 	payload: {
			// 		conversationId,
			// 		messages,
			// 	},
			// });
			gun.get('messages-room1').set({
				conversationId,
				messages,
				createdAt: Date.now(),
			});
			setInputValue('');
		}
	};
	const handlePaste = (e) => {
		const file = e?.clipboardData?.files?.[0];
		const url = URL.createObjectURL(file);
	};
	const handleAddIconToInput = (emoji) => {
		const input = textInputRef.current;
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
			{fileDragging && (
				<div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full pointer-events-none select-none bg-dark-green-lighter bg-opacity-30 backdrop-blur-sm">
					<h1 className="text-3xl font-bold text-primary">Drop file to send</h1>
				</div>
			)}
			{previewFiles.length > 0 && (
				<div className="flex items-center h-40 gap-3 px-4 border-t border-dark-lighten">
					{previewFiles.map((preview, index) => (
						<div key={index} className="relative py-2 bg-dark-lighten">
							<div className="flex flex-col items-center w-24 h-24 gap-2">
								<img
									className="object-cover w-full h-full"
									src={preview && getIcon(preview)}
									alt="icons"
								/>
								<span className="text-xs text-center text-clip ">{getFileName(preview?.name)}</span>
							</div>
							<button
								onClick={() => setPreviewFiles(previewFiles.filter((item) => item !== preview))}
								className="absolute flex items-center justify-center w-4 h-4 bg-gray-100 rounded-full top-1 right-1"
							>
								<i className="text-lg bx bx-x text-dark"></i>
							</button>
						</div>
					))}
				</div>
			)}
			<div
				className={`border-dark-lighten flex h-16 items-stretch gap-1 border-t px-4 ${
					disabled ? 'pointer-events-none select-none' : ''
				}`}
			>
				<button
					onClick={() => imageInputRef.current?.click()}
					className="flex items-center flex-shrink-0 text-2xl text-primary"
				>
					<i className="bx bxs-image-add"></i>
				</button>
				<input
					ref={imageInputRef}
					hidden
					className="hidden"
					type="file"
					accept="image/*"
					onChange={handleFileInputChange}
				/>
				<button
					onClick={() => fileInputRef.current?.click()}
					className="flex items-center flex-shrink-0 text-2xl text-primary"
				>
					<i className="bx bx-link-alt"></i>
				</button>
				<input
					ref={fileInputRef}
					hidden
					className="hidden"
					type="file"
					onChange={handleFileInputChange}
				/>

				<form onSubmit={handleFormSubmit} className="flex items-stretch flex-grow gap-1">
					<div className="relative flex items-center flex-grow">
						<input
							maxLength={1000}
							disabled={disabled}
							ref={textInputRef}
							value={inputValue}
							name="messages"
							onChange={(e) => {
								setInputValue(e.target.value);
							}}
							// onKeyDown={handleReplaceEmoji}
							onPaste={handlePaste}
							className="w-full pl-3 pr-10 rounded-full outline-none bg-dark-lighten h-9"
							type="text"
							placeholder="Message ..."
						/>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								setIsIconPickerOpened(true);
							}}
							className="absolute -translate-y-1/2 right-2 top-1/2"
						>
							<i className="text-2xl bx bxs-smile text-primary"></i>
						</button>
						{isIconPickerOpened && (
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
						)}
					</div>
					{fileUploading ? (
						<div className="flex items-center ml-1">
							<Spin width="24px" height="24px" color="#0D90F3" />
						</div>
					) : (
						<button type="submit" className="flex items-center flex-shrink-0 text-2xl text-primary">
							<i className="bx bxs-send"></i>
						</button>
					)}
				</form>
			</div>
		</>
	);
};

export default InputSection;
