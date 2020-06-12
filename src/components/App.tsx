import React, {Component, Fragment} from "react";
import styles from './App.scss';
import classNamesBind from "classnames/bind";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {AccountState} from "../reducers/AccountReducer";
import {AuthRouter, BasicRouter, NavRouter, NotAuthRouter} from "./Router";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import SystemNotFound from "./system/notFound/SystemNotFound";
import LoadingView from "./system/loadingView/LoadingView";
import {SystemState} from "../reducers/SystemReducer";
import {WSChat} from "../apis/WSChat";
import {LocalStorage} from "../utils/localstorage/LocalStorage";

const cx = classNamesBind.bind(styles);

export interface AppProps {
    account: AccountState,
    system: SystemState
}

interface AppState {
    chatEngine: WSChat
}

class App extends Component<AppProps, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            chatEngine: new WSChat()
        }
    }

    render(): any {
        const routeList = this.getRouter();
        const {system, account} = this.props;

        // 로그인 상태라면 채팅서버에 접속한다.
       /* if (account.loginStatus == "LOGIN") {
            //todo : 임시키 입력
            this.state.chatEngine.connect().then();
        }*/

        return (
            <Fragment>
                <LoadingView loadingView={system.loadingView}/>
                <BrowserRouter>
                    <Switch>
                        {routeList}
                        <Route component={SystemNotFound}/>
                    </Switch>
                </BrowserRouter>
            </Fragment>
        );
    }

    getRouter(): NavRouter[] {
        const {account} = this.props;

        let navRouter: NavRouter[];
        if (account.loginStatus == 'LOGIN') {
            navRouter = [...BasicRouter, ...AuthRouter];
        } else {
            navRouter = [...BasicRouter, ...NotAuthRouter];
        }

        return this.rotateRouter(navRouter, [], 0, "");
    }

    rotateRouter(routerList: NavRouter[], list: any[], index: number, path: string): any[] {
        for (let route of routerList) {
            const nowPath = path ? `${path}/${route.path}` : `/${route.path}`;

            if (route.component) {
                list.push(
                    <Route key={index} exact path={nowPath} component={route.component}/>
                );
                index += 1;
            }

            if (route.subNav) {
                this.rotateRouter(route.subNav, list, index, `${path}/${route.path}`);
            }
        }
        return list;
    }
}

export default connect(
    state => ({
        account: (state as any).account,
        system: (state as any).system
    }),
    dispatch => ({})
)(App);
