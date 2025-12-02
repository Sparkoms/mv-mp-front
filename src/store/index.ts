import { combineReducers, configureStore } from "@reduxjs/toolkit";
import app from "../features/App/reducer";
import userData from "../features/UserData/reducer";
import favorites from "../features/Favorites/reducer";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { T_RootState } from "./types";

const reducer = combineReducers({ app, userData, favorites });

const store = configureStore({ reducer });

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<T_RootState> = useSelector;
export default store;
