import io from 'socket.io-client'
import {LocalStorage} from "../utils/localstorage/LocalStorage";


// const socket: Socket = io(path);

export class WSChat {
    socket: SocketIOClient.Socket | null;
    statusCallback: (status: boolean) => void;

    constructor() {
        this.socket = null;
        this.statusCallback = status => {

        }

        // 체커 돌리기
        setInterval(() => {
            if (this.socket) {
                this.statusCallback(this.socket.connected);
            }
            return false;
        }, 1000)
    }


    // 연결상태를 반환한다.
    async connect() {
        // 이미 연결되어 있으면 실행하지 않는다.
        if ((this.socket) && (this.socket.connected)) {
            return;
        }

        // 소켓 로그인에 필요한 정보를 가저온다.
        const path = process.env.REACT_APP_CHAT_WS || '';
        const socket = io(path, {path: "/chat", reconnectionAttempts: 5});

        socket.on("handshake", (ack: (token: string) => void) => {
            ack(LocalStorage.getToken());
        })

        this.socket = socket;
    }

    async sendMsg(msg: MsgUnit) {

    }

    async getChatList() {
        const {socket} = this;
        if (!socket) {

        }
    }

    async disconnect() {
        this.socket?.disconnect();
    }

    async scheduleStatus(cb: (status: boolean) => void) {
        this.statusCallback = cb;
    }
}


export interface MsgUnit {
    msg: string
}
