import React, {ReactElement, Fragment} from "react";
import classNamesBind from "classnames/bind";
import styles from './AccountJoinView.scss';
import {AccountJoinAction} from "../AccountJoin";

const cx = classNamesBind.bind(styles);

const AccountJoinView = (action: AccountJoinAction): ReactElement => {
    return (
        <Fragment>
            <p>JoinView</p>
            <input className='form-control' onChange={event => {
                action.onChangeEmail(event.target.value);
            }}/>
        </Fragment>
    )
}

export default AccountJoinView;
