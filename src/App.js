import React, { Component } from 'react';
import './App.css';
import TextMask from './text-mask'

import store from './store'
import {Provider} from 'react-redux'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container fulldiv" style={{marginBottom: 0}}>
          {/* <Basic /> */}
          <TextMask />
          {/* <Login />
          <ReduxLogin />
          <MultiStep /> */}
        </div>
      </Provider>
    );
  }
}

export default App;
