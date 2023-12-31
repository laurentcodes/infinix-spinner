import axios from 'axios';

// USERS
export const getWinners = async () => {
	const { data } = await axios.get('/api/users');

	return data;
};

export const signUp = async (value) => {
	const { data } = await axios.post('/api/users', value);

	return data;
};

// ITEMS
export const getItems = async () => {
	const { data } = await axios.get('/api/items');

	return data;
};

// CODES
export const getCodes = async () => {
	const { data } = await axios.get('/api/codes');

	return data;
};

export const createCode = async (code) => {
	const { data } = await axios.post('/api/codes', code);

	return data;
};
