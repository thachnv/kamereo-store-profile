import React from "react";
import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import WrappedStoreProfile from "./modules/StoreProfile/StoreProfile";
import rootSaga from "./main-saga";
import mainReducer from "./main-reducer";

const sagaMiddleware = createSagaMiddleware();

const mainStore = createStore(
  mainReducer,
  compose(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={mainStore}>
      <WrappedStoreProfile />
    </Provider>
  );
}

export default App;
