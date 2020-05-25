import React, {Component} from "react";
import styles from './AccountJoin.scss';
import classNamesBind from "classnames/bind";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import AccountJoinView from "./view/AccountJoinView";
import produce from "immer";

const cx = classNamesBind.bind(styles);

export interface AccountJoinProps {

}

interface AccountJoinState {
    account: {
        email: string,
        pw: string,
        rePw: string
    }
}

class AccountJoin extends Component<AccountJoinProps, AccountJoinState> {
    render(): any {
        return (
            AccountJoinView(this.actions)
        );
    }

    actions: AccountJoinAction = {
        onChangePw: str => {
            this.setState(produce(this.state, draft => {
                draft.account.pw = str;
            }))
        },
        onChangeRePw: str => {
            this.setState(produce(this.state, draft => {
                draft.account.email = str;
            }))
        },
        onChangeEmail: str => {
            this.setState(produce(this.state, draft => {
                draft.account.email = str;
            }))
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
    onChangeRePw: (str: string) => void
}
