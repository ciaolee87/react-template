import {combineReducers} from 'redux'
import {AccountReducer} from "./AccountReducer";
import {SystemReducer} from "./SystemReducer";

const rootReducer = combineReducers({
	account : AccountReducer,
	system: SystemReducer
});

export default rootReducer;
