import excuteQuery from '../db/mysql';

class User {
	constructor(
		private id: string,
		private password: string,
		private password_solt_key?: string,
		
	){}
	set setPassword(pwd:string){
		this.password = pwd;
	}
	set setPasswordSoltKey(salt:string){
		this.password_solt_key = salt;
	}
	get getId():string{
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