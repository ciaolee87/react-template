import React, {Component, Fragment} from "react";
import styles from './ChatV1.scss';
import classNamesBind from "classnames/bind";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const cx = classNamesBind.bind(styles);

export interface ChatV1Props {

}

interface ChatV1State {

}

class ChatV1 extends Component<ChatV1Props, ChatV1State> {
    render(): any {
        return (
            <Fragment>
                <h3>Chat List</h3>
                <div className='row m-0'>
                </div>

                <hr/>
            </Fragment>
        );
    }

}

export default connect(
    state => ({}),
    dispatch => ({})
)(ChatV1);
