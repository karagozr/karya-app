import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';


const persistConfig = {
  key:"root",
  storage,
  whitelist:['auth'],
  blacklist:['alert',
             'reportFilter',
             'reportFilterProjectCodes',
             'plReportModalValuesReducers',
             'plReportTableValuesReducers',
             'pivotReportValuesReducers',
             'pivotReportValuesReducers',
             'pivotReporttemplateValuesReducers'
            ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware();
const store = {...createStore(persistedReducer,applyMiddleware(sagaMiddleware)), runSaga: sagaMiddleware.run(rootSaga)}

const persistor = persistStore(store);
// const configureStore = () => {
//   const sagaMiddleware = createSagaMiddleware();

//   return {
//     ...createStore(rootReducer, applyMiddleware(sagaMiddleware)),
//     runSaga: sagaMiddleware.run(rootSaga)
//   }
// };

export {store,persistor};
