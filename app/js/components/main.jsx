import RootComponent from './rootComponent.jsx'
import { store } from '../store.js'
import { Provider } from 'react-redux';
import Websocket from '../websocket.js';
import React from 'react';
import ReactDOM from 'react-dom';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
        <Provider store={store}>
          <RootComponent/>
        </Provider>
      </div>
  }
}

const domContainer = document.querySelector('#main');
ReactDOM.render(<MainComponent/>, domContainer);

const websocket = new Websocket();
websocket.connect();
websocket.subscribeToStore();

//console.log(store.getState().reducer)