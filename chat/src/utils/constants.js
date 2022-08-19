const icons = {
	pdf: '/icons/pdf.png',
	html: '/icons/html.png',
	css: '/icons/css.png',
	js: '/icons/js.png',
	doc: '/icons/doc.png',
	docx: '/icons/doc.png',
	xls: '/icons/xls.png',
	xlsx: '/icons/xls.png',
	ppt: '/icons/ppt.png',
	pptx: '/icons/ppt.png',
	png: '/icons/png.png',
	jpg: '/icons/jpg.png',
	jpeg: '/icons/jpg.png',
	txt: '/icons/txt.png',
};

const getIcon = (file) => {
	const extension = file.name.split('.').pop();
	if (extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
		return URL.createObjectURL(file);
	}
	return icons[extension] || icons['txt'];
};

export const THEMES = [
	'#62A388',
	'#EB3A2A',
	'#0AD4EB',
	'#643ECB',
	'#93BF34',
	'#E84FCF',
	'#B43F3F',
	'#E6A50A',
	'#69C90C',
	'#0D90F3',
];

export const STICKERS_URL =
	'https://cdn.jsdelivr.net/gh/naptestdev/zalo-stickers/data/favourite.json';

export default getIcon;
