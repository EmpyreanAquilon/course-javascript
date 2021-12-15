import LoginWindow from './ui/loginWindow.js';
import MainWindow from './ui/mainWindow.js';
import UserName from './ui/userName.js';
import UserList from './ui/userList.js';
import MessageList from './ui/messageList.js';
import MessageSender from './ui/messageSender.js';
import WSClient from './wsClient.js'

`ws://${location.host}/projects/mega-chat/ws`

export default class Megachat {
    constructor() {
        this.wsClient = new WSClient('ws://localhost:8000',this.onMessage.bind(this));

        this.ui = {
            loginWindow: new LoginWindow(document.querySelector('#login'), this.onLogin.bind(this)),
            mainWindow: new MainWindow(document.querySelector('#main')),
            userName: new UserName(document.querySelector('[data-role=user-name]')),
            userList: new UserList(document.querySelector('[data-role=user-list]')),
            
            messageList: new MessageList(document.querySelector('[data-role=message-list]')),

            messageSender: new MessageSender(document.querySelector('[data-role=message-sender]'), this.onSend.bind(this)),
            // userPhoto: new UserPhoto(document.querySelector('[data-role=user-photo]'), this.onUpload.bind(this)),
        };

        this.ui.loginWindow.show();
    }

    async onLogin(name) {
        await this.wsClient.connect();
        this.wsClient.sendHello(name);
        this.ui.loginWindow.hide();
        this.ui.mainWindow.show();
        this.ui.userName.set(name);
    }

    onUpload(data) {
        this.ui.userPhoto.set(data);

        fetch('/mega-chat/upload-photo', {
            method: 'post',
            body: JSON.stringify({
                name: this.ui.userName.get(),
                image: data,
            }),
        });
    }

    onSend(message) {
        this.wsClient.sendTextMessage(message);
        this.ui.messageSender.clear();
    }

    onMessage({ type, from, data }) {
        // console.log(type, from, data);

        if (type === 'hello') {
            this.ui.userList.add(from);
            this.ui.messageList.addSystemMessage(`${from} вошел в чат`);
        } else if (type === 'user-list') {
            for (const item of data) {
                this.ui.userList.add(item);
            }
        } else if (type === 'bye-bye') {
            this.ui.userList.remove(from);
            this.ui.messageList.addSystemMessage(`${from} вышел из чата`);
        } else if (type === 'text-message') {
            this.ui.messageList.add(from, data.message);
        }
    };
}



// function wsServer(userName) {
//     const socket = new WebSocket("ws://localhost:8000");
//     const messageText = document.querySelector('#messageText');
//     const sendButton = document.querySelector('#sendButton');
//     const messageContainer = document.querySelector('#messageContainer');
//     const user = {
//         type: 'enter',
//         data: userName,
//     };
//     setTimeout(() => {socket.send(JSON.stringify(user))}, 100);
    

//     socket.addEventListener('message', (message) => {
//         // const messageData = JSON.parse(message);
//         addMessage(message.data);
//     });

//     socket.addEventListener('error', () => {
//         console.log('Соединение закрыто или не может быть открыто');
//     });


//     function message(type, data) {
//         // socket.send(JSON.stringify({type,data}))
//     }

//     function addMessage(message) {
//         const messageItem = document.createElement('li');
     
//         messageItem.className = "message";
//         messageItem.textContent = message;
    
//         messageContainer.appendChild(messageItem);
//         messageContainer.scrollTop = messageContainer.scrollHeight;
//     };

//     function messageData(userName) {
//         const data = {
//             type: 'enter',
//             data: 1,
//         }
//     }

//     function sendMessage() {
//         const message = {
//             type: 'message',
//             data: messageText.value,
//         };
//         socket.send(JSON.stringify(message));
//         messageText.value = '';
//     };

//     sendButton.addEventListener('click', sendMessage);
//     messageText.addEventListener('change', sendMessage);
// };
 
// function enter() {
//     const enter = document.querySelector('.enterWindow');
//     const enterBtn = document.querySelector('.enterWindow button');
//     const error = document.querySelector('.error');
//     const window = document.querySelector('.window');
//     const nickname = document.querySelector('.nickname');
//     enterBtn.addEventListener('click', () => {
//         if (nickname.value) {
//             enter.style.display = 'none';
//             window.style.display = 'flex';
//             wsServer(nickname.value);
//             error.textContent = '';
//         } else {
//             error.textContent = 'введите никнейм';
//         };
//     });

// };

// enter();