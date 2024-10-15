import { call, put, takeLatest } from "redux-saga/effects";
import { login, loginSuccess, loginFailed } from "./AuthSlice"; 
import { loginApi } from "../../api/api"; 
import { FormType } from "../../types/types"; 

// Worker saga for handling login
function* handleLogin(action: ReturnType<typeof login>) {
  try {
    const user: FormType = yield call(loginApi, action.payload);
    yield put(loginSuccess(user)); 
  } catch (error) {
    yield put(
      loginFailed(error instanceof Error ? error.message : "Login failed")
    );
  }
}

export function* watchLogin() {
  yield takeLatest(login.type, handleLogin); 
}
