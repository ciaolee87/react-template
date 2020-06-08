import io from 'socket.io-client'
import {LocalStorage} from "../utils/localstorage/LocalStorage";


// const socket: Socket = io(path);

export class WSChat {
    socket: SocketIOClient.Socket | null;

    constructor() {
        this.socket = null;
    }

    async connect() {
        // 소켓 로그인에 필요한 정보를 가저온다.
        const path = process.env.REACT_APP_CHAT_WS || '';
        const socket = io(path, {path:'/chat'});

        // 소켓에 연결되면 사용자 인증을 한다
        socket.on('handshake', (ack: (token: string) => void) => {
            const token = LocalStorage.getToken();
            ack(token);
        });

        this.socket = socket;
    }

    async sendMsg(msg: MsgUnit) {

    }

    async getChatList() {
        const {socket} = this;
        if (!socket) {

        }
    }
}


export interface MsgUnit {
    msg: string
}
