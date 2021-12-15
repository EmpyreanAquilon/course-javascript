const http = require('http');
const Index = require('ws');

const server = http.createServer(async (req, res) => {res.end('ok')});

    // try {
    //     if (/\/photos\/.+\.png/.test(reg.url)) {
    //         const [, imageName] = req.url.match(/\/photos\/(.+\.png)/) || [];
    //         const fallBackPath = path.resolve(__dirname, '../no=photo.png');
    //         const filePath = path.resolve(__dirname, '../photos', imageName);

    //         if (fs.existsSync(filePath)) {
    //             return fs.createReadStream(filePath).pipe(res);
    //         } else {
    //             return fs.createReadStream(fallBackPath).pipe(res);
    //         }
    //     } else if (req.url.endsWith('/upload-photo')) {
    //         const body = await readBody(req);
    //         const name = body.name.replace(/\.\.\/|\//, '');
    //         const [, content] = body.image.match(/data:image\/.+?;base64,(.+)/) || [];
    //         const filePath = path.resolve(__dirname, '../photos', `${name}.png`);

    //         if (name && content) {
    //             fs.writeFileSync(filePath, content, 'base64');

    //             BroadcastChannel(connections, { type: 'photo-changed', data: { name } });
    //         } else {
    //             return res.end('fail');
    //         }
    //     }
    // } catch (e) {
    //     console.error(e);
    //     res.end('fail');
    // }

const wss = new Index.Server({ port: 8000 });
const connections = new Map();

// console.log("Сервер запущен на порту 8000")

wss.on('connection', (socket) => {
    connections.set(socket, {});
    sendMessageFrom(connections, { type: 'hello' }, socket);

    // socket.send(JSON.stringify(socket));
    // socket.send('fafafafaf');

    socket.on('message', (messageData) => {
        // console.log('новое сообщение');
        const message = JSON.parse(messageData);
        let excludeItself = false;

        if (message.type === 'hello') {
            excludeItself = true;
            connections.get(socket).userName = message.data.name;

            sendMessageTo({
                type: 'user-list',
                data: [...connections.values()].map((item) => item.userName).filter(Boolean),
            }, socket);
        };

        // sendMessageFrom(connections, message, socket, excludeItself);
    });

    socket.on('close', () => {
        sendMessageFrom(connections, { type: 'bye-bye' }, socket);
        connections.delete(socket);
    });
});

function sendMessageTo(message, to) {
    to.send(JSON.stringify(message));
};

function sendMessageFrom(connections, message, from, excludeSelf) {
    const socketData = connections.get(from);

    if (!socketData) {
        return;
    };

    message.from = socketData.userName;

    for (const connection of connections.keys()) {
        if (connection === from && excludeSelf) {
            continue;
        }

        connection.send(JSON.stringify(message));
    }
}

// server.listen(8282)