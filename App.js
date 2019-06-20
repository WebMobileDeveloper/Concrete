
import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';

import AppReducer from "./src/reducers/_index";
import LoadingView from './src/components/LoadingView';
import { AppNavigator, middleware } from "./src/navigations/AppNavigation";

console.disableYellowBox = true;


const store = createStore(AppReducer, applyMiddleware(middleware, thunkMiddleware));

class App extends React.Component {
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
AppRegistry.registerComponent("App", () => App);

export default App;