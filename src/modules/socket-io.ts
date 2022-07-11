import {Server} from 'socket.io';
interface Emits{
	login:Function;
}
interface Ons{

}

let emits:Emits;
let ons:Ons;

function startSocketIO(server:object){
	const io = new Server(server);
	io.on('connection', function(socket){
		console.log(`socket connect!!!`);
		emits = {
			login:function(data:object):void{
				socket.emit('login_info', JSON.stringify(data));
			}
		}
	})
}

export {
	startSocketIO,
	ons,
	emits
};
