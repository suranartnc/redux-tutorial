import jsonServer from 'json-server';
import db from './db';

const port = 3004;

const server = jsonServer.create();
const router = jsonServer.router(db());

// default middlewares
server.use(jsonServer.defaults());

// Add a delay for 1 second to /articles requests only
server.use('/articles', function(req, res, next) {
	setTimeout(next, 1000)
})

// router middleware
server.use(router);

server.listen(port);
console.log(`Api server listening on port: ${port}`);