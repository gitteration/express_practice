import excuteQuery from '../db/mysql';

class User {
	constructor(
		private id: String,
		private password: String,
		private password_solt_key?: String,
		
	){}
	set setPassword(pwd:String){
		this.password = pwd;
	}
	set setPasswordSoltKey(salt:String){
		this.password_solt_key = salt;
	}
	get getId():String{
		return this.id;
	}
	async selectUserByID(user:User):Promise<[]>{
		const query = `SELECT PASSWORD, PASSWORD_SOLT_KEY FROM USER WHERE ID = "${user.id}"`;
		const value = await excuteQuery(query);
		return value;
	}	
	async createUser(user:User):Promise<[]>{
		const query = `INSERT INTO USER(PK, ID, PASSWORD, PASSWORD_SOLT_KEY) values(PK, "${user.id}", "${user.password}", "${user.password_solt_key}")`;
		const value = await excuteQuery(query);
		return value;
	}

}

export = User;