import React, { Component } from 'react';

import { StateProvider } from './store/stateHelpers';
import docsReducer, { docsInitialState } from './store/docsReducer';

import DocDiff from './containers/DocDiff/DocDiff';
// import DocDiff_Legacy from './containers/DocDiff/DocDiff_Legacy';


class App extends Component {

  render() {
    return (
      <StateProvider initialState={docsInitialState} reducer={docsReducer}>
        <DocDiff/>
        {/*<DocDiff_Legacy/>*/}
      </StateProvider>
    );
  }

}

export default App;
