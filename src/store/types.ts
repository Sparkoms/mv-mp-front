import type {
  Action,
  CaseReducer,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import type store from ".";

export type T_RootState = ReturnType<typeof store.getState>;
export type T_AppThunk<T_ReturnType = void> = ThunkAction<
  T_ReturnType,
  T_RootState,
  unknown,
  Action<string>
>;
export type T_Dispatch = typeof store.dispatch;
export type T_Reducer<T, K = any> = CaseReducer<T, PayloadAction<K>>;
