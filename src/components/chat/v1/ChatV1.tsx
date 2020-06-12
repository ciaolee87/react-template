import React, {Component, Fragment} from "react";
import styles from './ChatV1.scss';
import classNamesBind from "classnames/bind";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import produce from "immer";
import {LocalStorage} from "../../../utils/localstorage/LocalStorage";
import {WSChat} from "../../../apis/WSChat";

const cx = classNamesBind.bind(styles);

export interface ChatV1Props {

}

interface ChatV1State {
    jwtToken: string,
    connectStatus: boolean,
    chat: WSChat
}

class ChatV1 extends Component<ChatV1Props, ChatV1State> {
    constructor(props: any) {
        super(props);
        this.state = {
            jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsInNlc3Npb25LZXkiOiJBQkNEIn0.ghJQnelxH_MxzsQwToi5v42YtIP-1Rr1Py9vdQLVVUg",
            connectStatus: false,
            chat: new WSChat()
        }
    }

    render(): any {
        return (
            <Fragment>
                <h3>Chat List</h3>
                <div className='row m-0'>
                    <div className={'col-12'}>
                        <label>JWT</label>
                        <input
                            value={this.state.jwtToken}
                            className='form-control'
                            type='text'
                            onChange={event => {
                                this.setState(produce(this.state, draft => {
                                    draft.jwtToken = event.target.value;
                                }))
                            }}/>
                        <button
                            className='btn btn-primary' style={{marginTop: '10px', marginRight: '10px'}}
                            onClick={event => {
                                this.apiConnect(true);
                            }}>키 입력 소켓연결
                        </button>

                        <button
                            className='btn btn-primary' style={{marginTop: '10px'}}
                            onClick={event => {
                                this.apiConnect(false);
                            }}>키 입력 실패 소켓연결
                        </button>

                        <span style={{
                            marginLeft: '10px',
                            fontSize: "1.5rem",
                            color: "red"
                        }}>{this.state.connectStatus ? "연결됨" : "연결되지 않음"}</span>
                    </div>
                </div>

                <hr/>
            </Fragment>
        );
    }


    // 연결
    apiConnect(keyValid: boolean) {
        const token = keyValid ? this.state.jwtToken : "INVALID";

        LocalStorage.setToken(token);
        this.state.chat.connect();
        this.state.chat.scheduleStatus(status => {
            this.setState(produce(this.state, draft => {
                draft.connectStatus = status;
            }))
        })
    }

}

export default connect(
    state => ({}),
    dispatch => ({})
)(ChatV1);
