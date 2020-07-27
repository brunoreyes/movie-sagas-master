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

// ------------ THESE ARE OUR (SAGAs) GENERATOR FUNCTIONS --------------
function* getMovies() {
  try {
    const response = yield axios.get('/api/display');
    yield console.log('This is what we get from axios.get: ', response.data);
    yield put({ type: 'SET_MOVIES', payload: response.data });
  } catch (error) {
    console.log('Trouble getting movies to display', error);
  }
}

function* detailMovies(action) {
  // make sure to put action up top because we are passing i5 through detailMovies
  try {
    console.log(`this is action.payload in detailMovies:${action.payload}`);

    const response = yield axios.get(`/api/display/detail/${action.payload}`);
    //   Changed the bottom for the top
    // const response = yield axios.get(
    //     `/api/display/detail/:id`
    //   );
    yield console.log('This is what we get from axios.get: ', response.data);
    yield put({ type: 'DETAIL_MOVIE', payload: response.data });
  } catch (error) {
    console.log('Trouble getting movie details to display', error);
  }
}

function* editMovies(action) {
  // make sure to put action up top because we are passing i5 through detailMovies
  try {
    console.log(`this is action.payload in editMovies:${action.payload}`);

    const response = yield axios.get(`/api/display/edit/${action.payload}`);
    //   Changed the bottom for the top
    // const response = yield axios.get(
    //     `/api/display/detail/:id`
    //   );
    yield console.log('This is what we get from axios.get: ', response.data);
    yield put({ type: 'EDIT_MOVIE', payload: response.data });
  } catch (error) {
    console.log('Trouble getting movie details to display', error);
  }
}

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', getMovies);
  yield takeEvery('FETCH_DETAIL', detailMovies);
  yield takeEvery('FETCH_EDIT', editMovies);

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

const edits = (state = [], action) => {
  console.log('in details', state, action.type);

  switch (action.type) {
    case 'EDIT_MOVIE':
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
