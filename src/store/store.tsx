import {configureStore} from '@reduxjs/toolkit';
import homeReducer from './home/slice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistConfig} from 'redux-persist/es/types';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistConfig: PersistConfig<any> = {
  key: 'home',
  storage: AsyncStorage,
  whitelist: ['messages'],
};

const persistedReducer = persistReducer(persistConfig, homeReducer);

const store = configureStore({
  reducer: {
    home: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
