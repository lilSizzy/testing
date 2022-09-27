import { compose, applyMiddleware} from 'redux';
import { legacy_createStore as createStore } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';

import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig,rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' &&  logger,
  sagaMiddleware
].filter(Boolean); // Lọc sản phẩm ra thành Boolean (True, False) từ đó áp dụng redux extension.

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose; // Thêm extension Redux trên chrome, phải add vô kiểu này mới dùng đc

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
    persistedReducer, 
    undefined, 
    composedEnhancers
    );

  sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);


