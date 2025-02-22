import {configureStore,combineReducers} from "@reduxjs/toolkit"
import userSlice from "../slices/userSlices"

import { persistReducer,persistStore } from "redux-persist"
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:"root",
    whitelist:["user"],
    storage
}

const reducer = combineReducers({
    user:userSlice
})

const persistedReducer = persistReducer(persistConfig,reducer)

const Store = configureStore({
    reducer:{
        persisted:persistedReducer
    }
})
const persistor = persistStore(Store)

export{Store,persistor}