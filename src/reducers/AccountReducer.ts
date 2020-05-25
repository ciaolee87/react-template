import {createActionCreators, createReducerFunction, ImmerReducer} from "immer-reducer";


export interface AccountState {
    loginStatus: LoginStatus
}

const initState: AccountState = {
    loginStatus: 'LOGOUT'
};

class Account extends ImmerReducer<typeof initState> {
    setState(state: LoginStatus) {
        this.draftState.loginStatus = state;
    }
}


export const AccountAction = createActionCreators(Account);
export const AccountReducer = createReducerFunction(Account, initState);

export type LoginStatus = 'LOGIN' | 'LOGOUT'
