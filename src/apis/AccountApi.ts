import ApiUnit from "./apis/ApiUnit";
import {BizReactor} from "./apis/types";
import firebase from "firebase";
import Swal from "sweetalert2";
import SwalSimple from "../utils/swal/simple/SwalSimple";

export class AccountApi extends ApiUnit {
    constructor() {
        super();
        firebase.initializeApp({
            apiKey: "AIzaSyCnnzbw0E_lx2VfhQiN-gHXkBNAJtFOknA",
            authDomain: "time-edu.firebaseapp.com",
            databaseURL: "https://time-edu.firebaseio.com",
            projectId: "time-edu",
            storageBucket: "time-edu.appspot.com",
            messagingSenderId: "572037614620",
            appId: "1:572037614620:web:cfecdaa5f680aed204a3d9",
            measurementId: "G-30KCFCV355"
        });
    }

    async join(status: {
        email: string,
        passwd: string
    }, reactor: BizReactor<null>) {

        try {
            let result = await firebase.auth().createUserWithEmailAndPassword(status.email, status.passwd);

            if (!result.user) {
                SwalSimple(`실패하였습니다.<br/>다시 시도하여 주십시오.`, 'error')
                return;
            }

            // 확인 이메일 보내기
            const user = result.user;
            user.sendEmailVerification().then();

            // 서버에 가입정보 보내기
            this.post('/api/account/join', reactor, {
                email: status.email,
                firebaseUid: user.uid
            });

        } catch (e) {
            if (e['code'] === 'auth/email-already-in-use') {
                SwalSimple('이미 가입된 이메일 입니다', 'error');
                return;
            } else {
                SwalSimple('이미 가입된 이메일 입니다', 'error');
                console.log(e);
                return;
            }
        }

    }
}
