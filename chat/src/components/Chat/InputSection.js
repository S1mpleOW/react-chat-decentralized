import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Spin } from 'react-cssfx-loading';
import { useParams } from 'react-router-dom';
import getIcon from '../../utils/constants';
import { getFileName, toBase64, setGunMessageRoom, getFileType } from '../../utils/helper';
import InputSendMessage from './InputSendMessage';
import IconPicker from './IconPicker';
import { useUserStore } from '../../store';

const pushAllFiles = (files, { sender, receiver }) => {
	let fileList = [];
	if (!sender || !receiver) return false;
	files.map(async (file) => {
		const extension = file.name.split('.').pop();
		const base64File = await toBase64(file);
		console.log({ type: getFileType(base64File), content: base64File, extension, name: file.name });
		setGunMessageRoom({
			room: 'messages-room1',
			message: { type: getFileType(base64File), content: base64File, extension, name: file.name },
			sender,
			receiver,
		});
		fileList.push(base64File);
	});

	return fileList;
};

const InputSection = ({ setInputSectionOffset, disabled }) => {
	const [fileDragging, setFileDragging] = useState(false);
	const [previewFiles, setPreviewFiles] = useState([]);
	const [fileUploading, setFileUploading] = useState(false);
	const [isIconPickerOpened, setIsIconPickerOpened] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const textInputRef = useRef(null);
	const imageInputRef = useRef(null);
	const fileInputRef = useRef(null);

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

	const { user } = useUserStore();

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
				if (entry && entry.isFile) {
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

	const handleFileInputChange = async (e) => {
		const uploadFiles = await e.target.files;
		setPreviewFiles((previewFiles) => [...previewFiles, ...uploadFiles]);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const informationConversation = { sender: user?.userPub, receiver: conversationId?.id };
		if (previewFiles.length > 0) {
			const files = [...previewFiles];
			const isPushedFile = pushAllFiles(files, informationConversation);
			if (isPushedFile) {
				// notify success
			} else {
				// notify error
			}
			setPreviewFiles([]);
		}

		const message = e.target.elements['messages']?.value;
		if (message) {
			setGunMessageRoom({
				message: { type: 'message', content: message },
				...informationConversation,
			});
		}

		setInputValue('');
	};

	const handlePaste = (e) => {
		const files = e?.clipboardData?.files;
		if (!files) return;
		for (let i = 0; i < files.length; i++) {
			console.log(files[i]);
			setPreviewFiles((prev) => [...prev, files[i]]);
		}
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
				className={`border-dark-green dark:border-dark-green-lighter flex h-16 items-stretch gap-1 border-t px-4 ${
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
					multiple
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
					accept="application/msword,
							application/vnd.ms-excel,
							application/vnd.ms-powerpoint,
							text/plain,
							application/pdf"
					type="file"
					onChange={handleFileInputChange}
					id="fileUploadHolder"
					multiple
				/>

				<form onSubmit={handleFormSubmit} className="flex items-stretch flex-grow gap-1">
					<div className="relative flex items-center flex-grow">
						<InputSendMessage
							maxLength={1000}
							disabled={disabled}
							ref={textInputRef}
							value={inputValue}
							className={`${
								disabled
									? 'pointer-events-none cursor-not-allowed'
									: 'pointer-events-auto cursor-text'
							}`}
							onChange={(e) => setInputValue(e.target.value)}
							name="messages"
							onPaste={handlePaste}
							type="text"
							placeholder="Message..."
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
							<IconPicker
								setIsIconPickerOpened={setIsIconPickerOpened}
								setInputValue={setInputValue}
								textInputRef={textInputRef}
							></IconPicker>
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
