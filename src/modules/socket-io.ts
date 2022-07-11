import {Server} from 'socket.io'; 
interface Socket{
	io:any;
	socket:any;
}

class Socket{
	constructor(server:any, socket:any){
		this.io = new Server(server);
		this.socket = socket;
	}
	start(){
		this.io.on('connection', function(socket:any){
			console.log(`socket connect!!!`);
			const soc = new Socket(null, socket);
			soc.ons();
		})
	}
	ons(){
		this.socket.on('test', function(data:string){
			console.log(data);
		})
	}
	test(data:any){
		this.socket.emit('login_info', data);
	}
}


export = Socket;