import mysql from 'mysql2/promise';
const mysql_config = require('../config/db_config').mysql;
const pool = mysql.createPool(mysql_config);

(async function(){	// mariadb connection check
	try{
		const connection = await pool.getConnection();
		connection.release();
		console.log(`mariadb success to access!!`);
	}catch(err){
		console.error(`mariadb fail to access::: ${err}`)
	}
			
})();

async function excuteQuery(query:string):Promise<any>{
	let connection:any;
	try{
		connection = await pool.getConnection();
		const [rows, fields] = await connection.query(query,[]);
		return rows;
	}catch(err){
		throw err;
	}finally{
		excuteTCL(connection);
	}
}

async function excuteTCL(connection:any){
	try{
		connection.commit();
	}catch(err){
		console.error(`excuteTCL-err ::: ${err}`);
		connection.rollback();
		return err;
	}finally{
		connection.release();
	}
}

export = excuteQuery;


/**** pool의 사용법 ****
 * 
 *  - 단일 쿼리(auto TCL) - 
 * 	
 * 	(async function(){
 * 		const connection = await pool.getConnection((connection) => connection);
 *		let [rows, fields] = await connection.query('select * from member');
 *		console.log('rows::', rows)
 *		console.log('fields:::', fields)
 *	})()
 * 
 * 
 * 
 *  - 다중 쿼리(handling TCl) -
 * 
 * 	(async function(){
 *		let connection = await pool.getConnection((connection) => connection);
 *		try{
 *			connection.beginTransaction();
 *			let [rows1, fields1] = await connection.query("insert into member values(pk,'show10032','456456','show10033@naver.com','M','2022-03-16 19:26:43.0','A','010-7148-5426',NULL,0,NULL,NULL)");
 *			let [rows2, fields2] = await connection.query("insert into member values(pk,'show10032','456456','show10033@naver.com','M','2022-03-16 19:26:43.0','A','010-7148-5426',NULL,0,NULL,NULL)");
 *			let [rows3, fields3] = await connection.query("insert into member values(pk,'show10032','456456','show10033@naver.com','M','2022-03-16 19:26:43.0','A','010-7148-5426',NULL,0,NULL,NULL)");		
 *			connection.commit();
 *		}catch(err){
 *			console.log('err::', err);
 *			connection.rollback();
 *		}finally{
 *			connection.release();
 *
 *		}
 *	})()
 *  
 * 
 *  참고 : https://blog.naver.com/pjt3591oo/221505148267
 */