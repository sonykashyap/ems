import {combineReducers} from 'redux';
import userReducer from '@/reducers/userReducer';
import roleReducer from '@/reducers/roleReducer';
import authReduer from './reducers/authReduer';

export default combineReducers({
    userReducer,
    roleReducer,
    authReduer
});