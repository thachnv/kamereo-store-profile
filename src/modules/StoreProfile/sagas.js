import { call, put, takeEvery } from "redux-saga/effects";
import { fetchStoreProfile, updateStoreProfile } from "../../api/api";

function* getStoreProfile() {
  try {
    const storeProfile = yield call(fetchStoreProfile);
    yield put({
      type: "GET_STORE_PROFILE_SUCCESS",
      payload: storeProfile
    });
  } catch (e) {
    yield put({ type: "GET_STORE_PROFILE_FAILED" });
  }
}
function* editStoreProfile(action) {
  try {
    const storeProfile = yield call(updateStoreProfile, action.payload);
    yield put({
      type: "EDIT_STORE_PROFILE_SUCCESS",
      payload: storeProfile
    });
  } catch (e) {
    yield put({
      type: "EDIT_STORE_PROFILE_FAILED",
      editStoreProfileError: e
    });
  }
}

function* storeProfileSaga() {
  yield takeEvery("GET_STORE_PROFILE", getStoreProfile);
  yield takeEvery("EDIT_STORE_PROFILE", editStoreProfile);
}

export default storeProfileSaga;
