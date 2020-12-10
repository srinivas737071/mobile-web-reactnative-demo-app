import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
import rootReducer from '../reducers';
import storage from 'redux-persist/lib/storage';
import CryptoJS from 'crypto-js';
const middleware = [thunk];
const encryptor = createTransform(
  (inboundState, key) => {
    if (!inboundState) {
      return inboundState;
    }
    const cryptedText = CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      'secret key 123',
    );
    return cryptedText.toString();
  },
  (outboundState, key) => {
    if (!outboundState) {
      return outboundState;
    }
    const bytes = CryptoJS.AES.decrypt(outboundState, 'secret key 123');
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  },
);
const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor],
  whitelist: [],
};

const initialState = {};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware),
);
const persistor = persistStore(store);

export {store, persistor};
