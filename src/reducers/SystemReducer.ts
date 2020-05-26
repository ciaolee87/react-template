import {createActionCreators, createReducerFunction, ImmerReducer} from "immer-reducer";


export interface SystemState {
    loadingView: LoadingViewStatus
}

const initState: SystemState = {
    loadingView: 'hide'
};

class System extends ImmerReducer<typeof initState> {
    loadingView(status: LoadingViewStatus) {
        this.draftState.loadingView = status;
    }
}


export const SystemAction = createActionCreators(System);
export const SystemReducer = createReducerFunction(System, initState);

export type LoadingViewStatus = 'show' | 'hide';
