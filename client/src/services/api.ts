import { Errors } from '../types';

export const baseUrl = 'http://localhost:3000/api';

interface Request {
	url: string;
	body: BodyInit;
}

type DataBackendUser<T> = {
	errors: Errors;
	data: T;
};

type DataBackendChat<T> = {
	errors: Errors;
	data: T;
};

export const postRequest = async <T>({
	url,
	body,
}: Request): Promise<DataBackendUser<T>> => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body,
	});

	try {
		const data = await response.json();
		return data;
	} catch (error: any) {
		console.log(error);
		throw new Error(error.response?.data.message);
	}
};

export const getRequest = async <T>(
	url: string,
): Promise<DataBackendChat<T>> => {
	const response = await fetch(url);

	try {
		const data = await response.json();

		return data;
	} catch (error: any) {
		console.log(error);
		throw new Error(error.response?.data.message);
	}
};
