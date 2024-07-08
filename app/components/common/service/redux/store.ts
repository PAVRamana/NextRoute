import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import approvalsSlice from './slices/approvalsSlice';

const EnMiddlewareMap: Record<string, Middleware[]> = {
  development: [],
};

export const getExtMiddlewareList = (env?: string) => {
  return EnMiddlewareMap[env ?? ''] || [];
};

const middlewareandler = (
  getDefaultMiddleware: CurriedGetDefaultMiddleware
) => {
  const middlewareList = [...getExtMiddlewareList(process.env.NODE_ENV)];
  return getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }).concat(middlewareList);
};

const rootReducer = combineReducers({
  approvalsData: approvalsSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => middlewareandler(getDefaultMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
