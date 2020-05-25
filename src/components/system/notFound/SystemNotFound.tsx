import React, {Component} from "react";
import styles from './SystemNotFound.scss';
import classNamesBind from "classnames/bind";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const cx = classNamesBind.bind(styles);

export interface SystemNotFoundProps {

}

interface SystemNotFoundState {

}

class SystemNotFound extends Component<SystemNotFoundProps, SystemNotFoundState> {
    render(): any {
        return (
            <p>NotFound</p>
        );
    }

}

export default connect(
    state => ({}),
    dispatch => ({})
)(SystemNotFound);
