/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from "react";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createReactNavigationReduxMiddleware, createReduxContainer } from "react-navigation-redux-helpers";


import AppReducer from "./reducers/_index";
import RootNavigator from "./navigations/RootNavigator";
import LoadingView from '../src/components/LoadingView';

console.disableYellowBox = true;


const middleware = createReactNavigationReduxMiddleware(state => state.nav);
const store = createStore(AppReducer, applyMiddleware(middleware));

const mapStateToProps = state => ({
  state: state.nav
});
const RootContainer = createReduxContainer(RootNavigator);

const AppNavigator = connect(mapStateToProps)(RootContainer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <LoadingView>
          <AppNavigator />
        </LoadingView>
      </Provider>
    );
  }
}