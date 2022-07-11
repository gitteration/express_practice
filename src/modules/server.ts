const port = 3000;

function startServer(server:any):any{
	server.listen(port, () => {
		console.log(`start server port : ${port}`);
	});
}

export = startServer;
