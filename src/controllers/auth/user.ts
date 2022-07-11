import { Request, Response, NextFunction } from 'express';
import User from '../../models/user';
import {emits} from '../../modules/socket-io';
const user_servic = require('../../services/auth/user');
const user_controllers = {
	createUser : async function(req: Request, res: Response, next: NextFunction){
		let message = 'success';
		let status = 200;
		try{
			const id: string = req.body.id;
			const password: string = req.body.password;
			if(!id || !password){
				message = `id or password empty!! email:${id}, password:${password}`;
				throw new Error(message);
			}
			let user = new User(id, password);
			user_servic.validateUserEmail(user);
			await user_servic.validateUserID(user);
			const [hash_password, salt] = user_servic.validateUserPassword(user);
			user.setPassword = hash_password;
			user.setPasswordSoltKey = salt;
			await user_servic.createUser(user); 
			res.status(status).json({status:status, message:message});
		}catch(err){
			status = 500;
			console.error('createUser', err);
			if(err instanceof Error){
				message = err.message;
			}
			res.status(status).json({status:status, message:message});
		}
	},
	login : async function(req: Request, res: Response, next: NextFunction){
		let message = 'success';
		let status = 200;
		try{
			const id:string = req.body.id;
			const password:string = req.body.password;
			const user = new User(id, password);
			const [hashedPassword,key]:string = await user_servic.selectUserByID(user);
			user_servic.vaildateUserHashPassword(password, hashedPassword, key);
			req.session.uid = user.getId;
			emits.login({status:status, message:message, data:user.getId});
			res.status(status).json({status:status, message:message, data:user.getId});
		}catch(err){
			status = 500;
			console.error('login', err);
			if(err instanceof Error){
				message = err.message;
			}
			res.status(status).json({status:status, message:message});
		}
	},
	logout : function(req: Request, res: Response, next: NextFunction){
		const test = user_servic.logout();
		res.json();
	},
	update : {
		password : function(req: Request, res: Response, next: NextFunction){
			const test = user_servic.updatePassword();
			res.json();
		}
	},
	deleteUser : function(req: Request, res: Response, next: NextFunction){
		const test = user_servic.deleteUser();
		res.json();
	}
}
export = user_controllers;
