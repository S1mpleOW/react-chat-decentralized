import { createContext, useContext, useEffect, useState } from 'react';

const darkmodeContext = createContext();

const DarkmodeProvider = (props) => {
	const [darkmode, setDarkmode] = useState(false);
	useEffect(() => {
		if (darkmode) {
			document && document.documentElement && document.documentElement.classList.add('dark');
		} else {
			document && document.documentElement && document.documentElement.classList.remove('dark');
		}
	}, [darkmode]);
	return (
		<darkmodeContext.Provider value={{ darkmode, setDarkmode }}>
			{props.children}
		</darkmodeContext.Provider>
	);
};

const useDarkmode = () => {
	const context = useContext(darkmodeContext);
	if (context === undefined) {
		throw new Error('useDarkmode must be used within a DarkmodeProvider');
	}
	return context;
};

export { DarkmodeProvider, useDarkmode };
