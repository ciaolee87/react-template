import React, {ReactElement, Fragment} from "react";
import classNamesBind from "classnames/bind";
import styles from './AccountJoinView.scss';
import {AccountJoinAction, AccountJoinState} from "../AccountJoin";

const cx = classNamesBind.bind(styles);

const AccountJoinView = (action: AccountJoinAction, state: AccountJoinState): ReactElement => {
    return (
        <Fragment>
            <p>JoinView</p>
            <form style={{width: '500px'}} onSubmit={event => {
                event.preventDefault();
                action.submit();
                return null;
            }}>
                <input
                    className='form-control'
                    placeholder='email'
                    onChange={event => {
                        action.onChangeEmail(event.target.value);
                    }}
                />
                <p>{state.stateMsg.email}</p>
                <input
                    className='form-control'
                    placeholder='password'
                    type='password'
                    onChange={event => {
                        action.onChangePw(event.target.value);
                    }}
                />
                <p>{state.stateMsg.pw}</p>
                <input
                    className='form-control'
                    placeholder='password confirm'
                    type='password'
                    onChange={event => {
                        action.onChangeRePw(event.target.value);
                    }}
                />
                <p>{state.stateMsg.rePw}</p>
                <button className='btn btn-primary'>
                    회원가입하기
                </button>
            </form>
        </Fragment>
    )
}

export default AccountJoinView;
