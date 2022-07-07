export const getExtensions = (fileName) => {
	return fileName.split('.').pop();
};

export const getFileName = (fileName) => {
	const name = fileName.slice(0, fileName.lastIndexOf('.'));
	const MAX_LENGTH_NAME = 10;
	return name.length > MAX_LENGTH_NAME ? name.slice(0, MAX_LENGTH_NAME) + '...' : name;
};
