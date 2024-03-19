import express, { Router } from 'express';
import { check } from 'express-validator';

import user from '../controllers/userController';
import errors from '../controllers/errorsController';
import { existUserWhitEmail } from '../utils/db-validations';
import { validFields } from '../middlewares/validFields';

const userRoute = Router();
userRoute.use(express.json());

userRoute.post(
	'/register',
	[
		check('name', 'Field name is required').notEmpty(),
		check(
			'name',
			'Field name must be at least 3 characters and max 30 characters',
		).isLength({ min: 3, max: 30 }),
		check('password', 'Field password is required').notEmpty(),
		check('email', 'Field email is required').notEmpty(),
		check('email', 'Field email must be a valid email').isEmail(),
		check('email', 'Field email must be at least six characters').isLength({
			min: 6,
		}),
		check('password', 'Password must be at least six characters').isLength({
			min: 6,
		}),
		existUserWhitEmail,
		validFields,
	],
	user.register,
);

userRoute.post(
	'/login',
	[
		check('email', 'Field email is required').isEmail(),
		check('password', 'Field password is required').notEmpty(),
		validFields,
	],
	user.login,
);

userRoute.get('/find/:id', user.findOneById);
userRoute.get('/', user.getAll);

userRoute.use(errors.error404);

export default userRoute;
