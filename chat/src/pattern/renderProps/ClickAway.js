import { useEffect, useRef } from 'react';

const ClickAway = ({ children, handleClickAway = () => {} }) => {
	const propsRef = useRef(null);
	useEffect(() => {
		const handleClick = (e) => {
			if (propsRef.current && !propsRef.current.contains(e.target)) {
				handleClickAway();
			}
		};
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children(propsRef)}</>;
};

export default ClickAway;
