import { takeLatest, all, call, put } from 'redux-saga/effects'

import { getCategoriesAndDocuments } from '../../ulti/fireBase/filebase.ulti';

import { fetchCategoriesSuccess, fetchCategoriesFailed} from './category.actions';

import { CATEGORIES_ACTION_TYPE } from './category.types';

export function* fetchCategoriesAsync() {
 try {
        const categoriesArray= yield call(getCategoriesAndDocuments,'categories');
        yield put(fetchCategoriesSuccess(categoriesArray));    
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START,fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}