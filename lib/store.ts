import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { cryptoCurrenciesApi } from './cryptoCurrenciesApi'
import currentPageReducer from "./currentPage"
import { createWrapper } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


export const store = configureStore({
  reducer: {
    [cryptoCurrenciesApi?.reducerPath]: cryptoCurrenciesApi?.reducer,
    currentPage: currentPageReducer
  },
  middleware: (getDefaultMiddleware) => {
    if (cryptoCurrenciesApi) {
      return getDefaultMiddleware().concat(cryptoCurrenciesApi?.middleware)
    } else {
      return getDefaultMiddleware()
    }
  }

})
const makeStore = () => store



export type Store = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, Store, unknown, Action>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<Store>(makeStore);