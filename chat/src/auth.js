import GUN from 'gun';
import 'gun/sea';
import 'gun/axe';

//database
export const db = GUN({
	localStorage: false,
});

//gun user
export const user = db.user().recall({ sessionStorage: true });
