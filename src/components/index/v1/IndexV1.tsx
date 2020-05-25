import React, {Component} from "react";
import styles from './IndexV1.scss';
import classNamesBind from "classnames/bind";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const cx = classNamesBind.bind(styles);

export interface IndexV1Props {

}

interface IndexV1State {

}

class IndexV1 extends Component<IndexV1Props, IndexV1State> {
    render(): any {
        return (
            <p>Index</p>
        );
    }

}

export default connect(
    state => ({}),
    dispatch => ({})
)(IndexV1);
