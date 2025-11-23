import {combineReducers} from 'redux';
import userReducer from '@/reducers/userReducer';
import roleReducer from '@/reducers/roleReducer';

export default combineReducers({
    userReducer,
    roleReducer
});