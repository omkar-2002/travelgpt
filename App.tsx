import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
import store, {persistor} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
