import { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gun } from '../App';
import { useUserStore } from '../store';

const themeContext = createContext();

const getTheme = (theme) => {
	switch (theme) {
		case '#62A388':
			return 'primary-color';
		case '#EB3A2A':
			return 'secondary-color';
		case '#0AD4EB':
			return 'tertiary-color';
		case '#643ECB':
			return 'quaternary-color';
		case '#93BF34':
			return 'quinary-color';
		case '#E84FCF':
			return 'senary-color';
		case '#B43F3F':
			return 'septenary-color';
		case '#E6A50A':
			return 'octonary-color';
		case '#69C90C':
			return 'nonary-color';
		case '#0D90F3':
			return 'denary-color';
		default:
			return 'primary-color';
	}
};

const ThemeProvider = (props) => {
	const [theme, setTheme] = useState('');
	const { id } = useParams();
	const { user } = useUserStore();

	useEffect(() => {
		if (!id || !user) {
			return;
		}
		gun
			.get('conversations')
			.get(user.userPub)
			.get(id)
			.once((data) => {
				if (!data || !data.theme) {
					return;
				}
				setTheme(data.theme);
			});
	}, [id, user]);

	return (
		<themeContext.Provider value={{ theme, getTheme, setTheme }}>
			{props.children}
		</themeContext.Provider>
	);
};

const useTheme = () => {
	const context = useContext(themeContext);
	if (context === undefined) {
		throw new Error('useDarkmode must be used within a DarkmodeProvider');
	}
	return context;
};

export { ThemeProvider, useTheme };
