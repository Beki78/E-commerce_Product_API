import { call, put, takeEvery, all } from "redux-saga/effects";
import { fetchProductsApi } from "../../api/api";
import {
  fetchProduct,
  fetchProductSuccess,
  fetchProductFailed,
} from "./ProductSlice";
import { ProductType } from "../../types/types";

export function* fetchSongSaga() {
  try {
    const products: ProductType[] = yield call(fetchProductsApi);
    console.log("Fetched songs:", products);
    yield put(fetchProductSuccess(products));
  } catch (error) {
    yield put(fetchProductFailed((error as Error).message));
  }
}

function* watchFetchProductSaga() {
  yield takeEvery(fetchProduct.type, fetchSongSaga);
}

export default function* rootSaga() {
  yield all([watchFetchProductSaga()]);
}
