import React, { Component } from 'react';

import { StateProvider } from './store/stateHelpers';
import docsReducer, { docsInitialState } from './store/reducers/docsReducer';

import DocDiff from './containers/DocDiff/DocDiff';


class App extends Component {

  render() {
    return (
      <StateProvider initialState={docsInitialState} reducer={docsReducer}>
        <DocDiff/>
      </StateProvider>
    );
  }

}

export default App;
