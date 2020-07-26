import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios'; // end imports
import { takeEvery, put } from 'redux-saga/effects';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';

// ------------ THESE ARE OUR GENERATOR FUNCTIONS --------------
function* getMovies() {
  try {
    const response = yield axios.get('/api/display');
    yield console.log('This is what we get from axios.get: ', response.data);
    yield put({ type: 'SET_MOVIES', payload: response.data });
  } catch (error) {
    console.log('Trouble getting movies to display', error);
  }
}

// function* updateMovies(action) {
//     try{
//         //we need to get the data to updateCategory in here
//         console.log('in updateCategory');
//         const response = yield axios.put('/api/display', action.payload);
//         yield console.log('In updateCategory', response);
//         yield put ({ type: 'FETCH_MOVIES'})
//     }
//     catch(error) {
//         console.log( 'Trouble adding to category', error )
//     }
// }

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', getMovies);
  //   yield takeEvery('SET_CATEGORY', updateMovies);
}

// ------------ THESE ARE OUR REDUCERS --------------

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

const details = (state = [], action) => {
  console.log('in details', state, action.type);

  switch (action.type) {
    case 'DETAIL_MOVIE':
      return action.payload;
    default:
      return state;
  }
};

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    details,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();