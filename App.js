import React from 'react';
import { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore} from 'redux';
import { Provider} from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import rootReducer from './src/reducers/reducer';
import Game from './src/components/main/Game';

const store = createStore(rootReducer, devToolsEnhancer());

export default class App extends Component {
    render() {
        return (
          <Provider store={store}>
              <View style={styles.container}>
                  <Game/>
              </View>
          </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
