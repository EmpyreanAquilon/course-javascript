// const HTTPServer = new require('http');
const WebSocketServer = new require('ws');

// const server = http.createServer({ port: 8000 });
const wsServer = new WebSocketServer.Server({ port: 8000 });
const connections = new Map();

var clients = {};
let currentId = 1;


wsServer.on('connection', (socket) => {
    const id = currentId++;
    clients[id] = socket;
    console.log("новое соединение " + id);

    // connections.set(socket, {});
    
    
    for(const key in clients) {
        // clients[key].send((JSON.stringify(clients[id])));
        clients[key].send(`кто-то присоединился к чату`);
    };
    

    socket.on('message', (message) => {
        console.log('получено сообщение ' + message);
        const messageData = JSON.parse(message);

        if (messageData.type === 'enter') {
            for(const key in clients) {
                clients[key].send(`${messageData.data} присоединился к чату`);
            };
        } else if (messageData.type === 'message') {
            for(const key in clients) {
                clients[key].send(messageData.data.toString());
            };
        }
        // } else if (messageData.type === 'leave') {
        //     for(const key in clients) {
        //         clients[key].send(`${messageData.data} покинул чат`);
        //     };
        // }
    });

    socket.on('close', () => {
        console.log('соединение закрыто ' + id);
        delete clients[id];

        // const userData = connections.get(socket);

        // for (const con of connections.keys()) {
        //     con.send(JSON.stringify(userData.userName))
        // };

        // connections.delete(socket)
    });

    function sendMessageTo() {

    };

    function sendMessageFrom() {

    }
});

console.log("Сервер запущен на порту 8000");