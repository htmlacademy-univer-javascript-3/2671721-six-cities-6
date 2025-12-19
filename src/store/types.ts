import { store } from './index';
import { TypedUseSelectorHook } from 'react-redux';

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Selector = (state: AppRootStateType) => ReturnType<TypedUseSelectorHook<AppRootStateType>>;

