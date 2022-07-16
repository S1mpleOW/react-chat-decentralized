export const getExtensions = (fileName) => {
	return fileName.split(".").pop();
  };
  
  export const getFileName = (fileName) => {
	const name = fileName.slice(0, fileName.lastIndexOf("."));
	const MAX_LENGTH_NAME = 10;
	return name.length > MAX_LENGTH_NAME
	  ? name.slice(0, MAX_LENGTH_NAME) + "..."
	  : name;
  };
  
  export const toBase64 = (file) =>
	new Promise((resolve, reject) => {
	  const reader = new FileReader();
	  reader.readAsDataURL(file);
	  reader.onload = () => resolve(reader.result);
	  reader.onerror = (error) => reject(error);
	});
  
  export const setGun = (gun, room, message, sender, receiver) => {
	gun.get(room).set({
		sender: '1',
		message,
		receiver: '2',
		createdAt: Date.now(),
	});
  };
  
  export const getFileType = (fileBase64) => {
	const head = fileBase64.split(";")[0];
	const type = head.split("/")[1];
  
	const officeType = type.split(".").pop() || "";
	return officeType ? officeType : type;
  
	//pdf, document, sheet
	//png, png, ...
  };
  