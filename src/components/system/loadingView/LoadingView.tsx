import React, {Component, Fragment} from "react";
import styles from './LoadingView.scss';
import classNamesBind from "classnames/bind";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ReactLoading from "react-loading";
import {LoadingViewStatus} from "../../../reducers/SystemReducer";


const cx = classNamesBind.bind(styles);

export interface LoadingViewProps {
	loadingView: LoadingViewStatus
}

interface LoadingViewState {

}

class LoadingView extends Component<LoadingViewProps, LoadingViewState> {
	render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		const {loadingView} = this.props;

		return (
			<Fragment>
				{loadingView == "show" && (
					<div className={cx('full-screen')}>
						<div className={'row m-0'} style={{height: '100%'}}>
							<div className='col-12 align-self-center'>
								<ReactLoading
									type="spinningBubbles"
									className={cx('spinner')}
									color={"#ffffff"}
									height={"60px"}
									width={"60px"}/>
								<h5 className='text-center' style={{marginTop: '40px', color: 'white', fontSize: '1rem'}}>잠시 기다려 주십시오.</h5>
							</div>

						</div>
					</div>
				)}
			</Fragment>
		);
	}

}

export default connect(
	state => ({}),
	dispatch => ({})
)(LoadingView);
