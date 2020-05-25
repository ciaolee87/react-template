import React, {Component, Fragment} from "react";
import AccountJoin from "./account/join/AccountJoin";
import IndexV1 from "./index/v1/IndexV1";
import AccountLogin from "./account/login/AccountLogin";

export interface NavRouter {
    // 라우터 만들때 사용
    path: string;
    name: string;
    component?: any;
    subNav?: NavRouter[];

    // 네비게이션 만들때 사용
    isView: boolean;
    link?: string
}

// 로그인, 로그아웃 모든 상태에서 활성화 되는 라우터
export const BasicRouter: NavRouter[] = [
    {path: "", name: "Home", component: IndexV1, isView: false},
];

// 로그인 했을때 활성화 되는 라우터
export const AuthRouter: NavRouter[] = [];

// 로그아웃 했을때 활성화 되는 라우터
export const NotAuthRouter: NavRouter[] = [
    {
        path: "account", name: "", isView: true, subNav: [
            {path: "join", name: "Join", isView: true, component: AccountJoin},
            {path: "login", name: "Login", isView: true, component: AccountLogin},
        ]
    }
];
