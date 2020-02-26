import { all } from 'redux-saga/effects';
import storeProfileSaga from './modules/StoreProfile/sagas';

export default function* rootSaga() {
  yield all([
    storeProfileSaga(),
  ]);
}
