import React, {Component} from "react";
import styles from './AccountLogin.scss';
import classNamesBind from "classnames/bind";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const cx = classNamesBind.bind(styles);

export interface AccountLoginProps {

}

interface AccountLoginState {

}

class AccountLogin extends Component<AccountLoginProps, AccountLoginState> {
    render(): any {
        return (
            null
        );
    }

}

export default connect(
    state => ({}),
    dispatch => ({})
)(AccountLogin);
