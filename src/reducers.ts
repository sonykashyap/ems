import {combineReducers} from 'redux';
import userReducer from '@/reducers/userReducer';
import roleReducer from '@/reducers/roleReducer';
import authReduer from './reducers/authReduer';
import dashboardReducer from './reducers/dashboardReducer';

export default combineReducers({
    userReducer,
    roleReducer,
    authReduer,
    dashboardReducer
});