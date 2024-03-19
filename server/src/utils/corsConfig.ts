const whiteList = [
	'http://localhost:3000',
	'http://localhost:5173',
	'http://localhost:4321',
];

const corsOptions = {
	origin: (
		org: string | undefined,
		callback: (err: Error | null, origin?: boolean | undefined) => void,
	) => {
		if (whiteList.indexOf(org || '0') !== 1) {
			callback(new Error('Not Allowed by CORS'));
		} else {
			callback(null, true);
		}
	},
};

export default corsOptions