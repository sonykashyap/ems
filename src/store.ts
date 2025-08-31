import {configureStore} from '@reduxjs/toolkit';
import reducer from '@/reducers';


const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware : any)=> getDefaultMiddleware({
    serializableCheck: false
  })
})

export default store;