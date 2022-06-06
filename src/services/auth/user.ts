import {createPbkdf2, createRandomByteBase64} from '../../utils/utils';

const user_controllers = {
	validateUserEmail : function(user:any){
		const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
		if(user.id.match(regEmail) == null){
			throw new Error('올바른 이메일 형식이 아닙니다.');
		}
	},
	validateUserPassword : function(user:any):String[]{
		const regPassword =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/;
		if(user.password.match(regPassword) == null){
			throw new Error('올바른 비밀번호 형식이 아닙니다.');
		}else{
			const salt = createRandomByteBase64();
	        const key = createPbkdf2(user.password, salt);
	        const hash_password = key.toString('base64');
			return [hash_password, salt];
		}
	},
	vaildateUserHashPassword : function(input_password:String, user_hash_password:String, user_solt_key:String){
		const validation_key = createPbkdf2(input_password, user_solt_key);
		const validation_password = validation_key.toString("base64");
		if (user_hash_password != validation_password){
        	throw new Error('비밀번호가 틀립니다.');
        } 
	},
	validateUserID : async function(user:any){
		const value = await user.selectUserByID(user);
		if(value != 0){
			throw new Error('중복된 아이디가 있습니다');
		}else{
		}
	},
	selectUserByID : async function(user:any):Promise<[String,String]>{
		const value = await user.selectUserByID(user);
		if(value.length == 0){
			throw new Error('없는 아이디입니다.');
		}else{
			return [value[0].PASSWORD, value[0].PASSWORD_SOLT_KEY];
		}
	},
	createUser : async function(user:any){
		const value = await user.createUser(user);
		return value;
	},
	logout : function(){

	},
	updatePassword : function(){
		
	},
	deleteUser : function(){
	
	}
}
export = user_controllers;
