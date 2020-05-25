import React, {Component} from "react";
import styles from './AccountJoin.scss';
import classNamesBind from "classnames/bind";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const cx = classNamesBind.bind(styles);

export interface AccountJoinProps {

}

interface AccountJoinState {

}

class AccountJoin extends Component<AccountJoinProps, AccountJoinState> {
    render(): any {
        return (
            <p>join</p>
        );
    }

}

export default connect(
    state => ({}),
    dispatch => ({})
)(AccountJoin);
