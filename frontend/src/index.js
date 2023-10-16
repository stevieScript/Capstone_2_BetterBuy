import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={'loading'} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

