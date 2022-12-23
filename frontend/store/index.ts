import { Context, createWrapper } from 'next-redux-wrapper';
import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { reducer, RootState } from "./reducers";


const makeStore = (context: Context) => createStore(reducer, applyMiddleware(thunk))

export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: false })

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>
