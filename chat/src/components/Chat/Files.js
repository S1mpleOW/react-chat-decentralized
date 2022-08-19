import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gun } from '../../App';
import { useUserStore } from '../../store';
import { formatFileSize, isFileOrImage } from '../../utils/helper';

const FileIcon = {
	doc: `bx bxs-file-doc`,
	pdf: `bx bxs-file-pdf`,
	xls: `bx bxs-file-spreadsheet`,
	xlsx: `bx bxs-file-spreadsheet`,
	ppt: `bx bxs-file-presentation`,
	pptx: `bx bxs-file-presentation`,
	txt: `bx bxs-file-txt`,
	html: `bx bxs-file-html`,
	css: `bx bxs-file-css`,
	js: `bx bxs-file-js`,
	json: `bx bxs-file-json`,
};

const File = ({ id, name, content, extension }) => {
	return (
		<div key={id} className="flex items-center gap-4 p-2">
			<div className="w-6 h-6">
				{FileIcon[extension] ? (
					<i className={FileIcon[extension]}></i>
				) : (
					<i className={FileIcon.txt}></i>
				)}
				<i></i>
			</div>
			<div className="flex-grow">
				<h1>{name}</h1>
			</div>
			<a
				href={content}
				download={name}
				target="_blank"
				rel="noopener noreferrer"
				className="flex-shrink-0"
			>
				<i className="text-2xl bx bxs-download"></i>
			</a>
		</div>
	);
};

const Files = () => {
	const [files, setFiles] = React.useState([]);
	const { user } = useUserStore();
	const conversationId = useParams();
	useEffect(() => {
		if (!conversationId || !user) {
			return;
		}
		setFiles([]);
		gun
			.get('conversations')
			.get(user.userPub)
			.get(conversationId.id)
			.get('messages')
			.map()
			.once((data, id) => {
				if (!data || data.length < 0) return;
				console.log(data);
				const { extension, name, content } = data;
				if (isFileOrImage(extension) === 'file') {
					setFiles((prev) => [...prev, { name, content, extension, id }]);
				}
			});
	}, [user, conversationId]);

	return (
		<div className="flex flex-col items-stretch gap-3 p-4 overflow-y-auto h-80">
			{files.map((file) => (
				<File key={file.id} {...file} />
			))}
		</div>
	);
};

export default Files;
