import { Server } from "socket.io";

const io = new Server(server);
io.on('connection', function(socket:any){
	console.log('socket connection!!');
	socket.on('disconnect', function(){
		console.log('socket disconnected!!');  
	});
	
	return {
		test : function(){
			socket.emit("login_info", 'test');				
		}


	}
});




export = io;