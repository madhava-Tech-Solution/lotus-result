import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createReducer from './redux/reducers';
import rootSaga from './redux/rootSaga';
import { Main, NotFound } from './containers/pageListAsync';
import Login from './containers/Login/Login';
// import Dashboard from './containers/Dashboard/Index';
import Layout from './containers/Layout/Index';
import Home from './containers/Home/Index';
import { TextContext } from './contexts/SearchContext';
import SingleBetCricket from './containers/SinglebetCricket/Index';
import SingleBetSoccer from './containers/SingleBetSoccer';
// import MatchDataBookmaker from './containers/MatchDataBookmaker';
import BookmakerCricket from './components/Bookmakersport/BookmakerCricket';
import { ToggleTableContext } from './contexts/TogleContext';
import PrivateRoute from './helpers/PrivateRoute';

const sagaMiddleware = createSagaMiddleware();
const reducer = createReducer();
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

sagaMiddleware.run(rootSaga);

function App() {
  const [search, setSearch] = useState('');
  const [tooggleTableClick, setToggleTableClick] = useState(1);
  return (
    <TextContext.Provider value={{ search, setSearch }}>
      <ToggleTableContext.Provider
        value={{ setToggleTableClick, tooggleTableClick }}
      >
        <Provider store={store}>
          <BrowserRouter>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              limit={1}
              ProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              // pauseOnFocusLoss
              draggable
              // pauseOnHover
              theme="colored"
            />
            <Routes>
              {/* <Route path="/" element={<Landing />} /> */}
              <Route path="/*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                {/* <Route index element={<Dashboard />} /> */}
                <Route index element={<Main />} />
                <Route
                  path="single-bet/cricket/:eventId"
                  element={<SingleBetCricket />}
                />
                <Route
                  path="single-bet/soccer/:eventId"
                  element={<SingleBetSoccer />}
                />
                <Route
                  path="bookmaker/single-bet/cricket/:eventId"
                  element={<BookmakerCricket />}
                />

                <Route path="home" element={<Home />} />
              </Route>
            </Routes>

            <Routes></Routes>
          </BrowserRouter>
        </Provider>
      </ToggleTableContext.Provider>
    </TextContext.Provider>
  );
}

export default App;
