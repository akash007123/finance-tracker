import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import financeReducer from './financeSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['transactions', 'budgets'],
};

const persistedReducer = persistReducer(persistConfig, financeReducer);

export const store = configureStore({
  reducer: {
    finance: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;