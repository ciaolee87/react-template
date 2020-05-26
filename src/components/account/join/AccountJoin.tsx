import React, {Component} from "react";
import styles from './AccountJoin.scss';
import classNamesBind from "classnames/bind";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import AccountJoinView from "./view/AccountJoinView";
import produce from "immer";
import {EmailRegEx, PasswdRegEx, Validator} from "../../../utils/regex/RegEx";
import SwalSimple from "../../../utils/swal/simple/SwalSimple";

const cx = classNamesBind.bind(styles);

export interface AccountJoinProps {

}

export interface AccountJoinState {
    account: {
        email: string,
        pw: string,
        rePw: string
    },
    stateMsg: {
        email: string,
        pw: string,
        rePw: string
    }
}

class AccountJoin extends Component<AccountJoinProps, AccountJoinState> {
    constructor(props: any) {
        super(props);
        this.state = {
            account: {
                email: '',
                pw: '',
                rePw: ''
            },
            stateMsg: {
                email: '',
                pw: '',
                rePw: ''
            }
        }
    }

    render(): any {
        return (
            AccountJoinView(this.actions, this.state)
        );
    }

    actions: AccountJoinAction = {
        onChangePw: str => {
            this.setState(produce(this.state, draft => {
                draft.account.pw = str;

                draft.stateMsg.pw = Validator.password(str) ?
                    "" : "숫자, 영어를 포함하여 8자리 이상 16자리 미만으로 작성하여 주십시오.";
            }))

        },
        onChangeRePw: str => {
            this.setState(produce(this.state, draft => {
                draft.account.rePw = str;

                draft.stateMsg.rePw = (str == this.state.account.pw) ?
                    "" : "두 패스워드가 서로 다릅니다."
            }))
        },
        onChangeEmail: str => {
            this.setState(produce(this.state, draft => {
                draft.account.email = str;

                draft.stateMsg.email = Validator.email(str) ?
                    "" : "이메일을 정확하게 입력하여주십시오.";
            }))
        },
        submit: () => {
            const {account} = this.state;

            console.log(account);

            if (!Validator.email(account.email)) {
                SwalSimple("이메일을 확인하여 주십시오", "warning");
                return;
            }

            if (!Validator.password(account.pw)) {
                SwalSimple("비밀번호를 확인하여 주십시오.", "warning");
                return;
            }

            if (account.pw !== account.rePw) {
                SwalSimple("두 비밀번호가 다릅니다.", "warning");
                return;
            }

        }
    }
}

export default connect(
    state => ({}),
    dispatch => ({})
)(AccountJoin);


export interface AccountJoinAction {
    onChangeEmail: (str: string) => void,
    onChangePw: (str: string) => void,
    onChangeRePw: (str: string) => void,
    submit: () => void
}
