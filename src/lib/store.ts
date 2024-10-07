import { useDispatch } from "react-redux";

import {
	legacy_createStore as createStore,
	applyMiddleware,
	Action,
} from "redux";
import { thunk, ThunkDispatch } from "redux-thunk";
import rootReducer from "../reducer";

export function useAppDispatch(): AppDispatch {
	const dispatch: AppDispatch = useDispatch();
	return dispatch;
}
export {useSelector, useDispatch} from 'react-redux'
const middleWare = applyMiddleware(thunk);

const store = createStore(rootReducer, undefined, middleWare);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, Action>;