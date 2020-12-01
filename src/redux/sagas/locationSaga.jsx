import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Send location to location.router
function* getLocation(action) {

    try {
        const locationResponse = yield axios.get(`/api/location?tag=${action.payload}`)
        yield put({ type: 'SET_WEATHER_DATA', payload: locationResponse.data })
    } catch (error) {
        console.log('error in getLocation Saga', error.response.status);
        if (error.response.status === 500 ) {
            yield put({ type: 'LOCATION_ERROR', action: error.response.status })
        }
    }
} // end getLocation Saga

// Watcher Saga
function* locationSaga() {
    yield takeLatest('SEARCH_LOCATION', getLocation)   
} // end Watcher Saga newNamesSaga



export default locationSaga;