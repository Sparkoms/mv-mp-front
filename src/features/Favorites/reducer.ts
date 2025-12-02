import { createAction, createReducer } from "@reduxjs/toolkit";
import type { I_Favorites } from "./types";
import type { AnyAction, PayloadAction } from "@reduxjs/toolkit";

const initialState: I_Favorites = [];

const addToFavoritesAction = createAction<number>("FAVORITES/add");
const removeFromFavoritesAction = createAction<number>("FAVORITES/remove");

const favoritesReducer = createReducer(initialState, (builder) => {
  builder.addCase(
    addToFavoritesAction,
    (state: any, action: PayloadAction<number>) => [...state, action.payload]
  );

  builder.addCase(
    removeFromFavoritesAction,
    (state: any, action: PayloadAction<number>) =>
      state.filter((favoriteId: number) => favoriteId !== action.payload)
  );
});

export const addToFavorites = (favoriteId: number): AnyAction =>
  addToFavoritesAction(favoriteId);

export const removeFromFavorites = (favoriteId: number): AnyAction =>
  removeFromFavoritesAction(favoriteId);

export default favoritesReducer;
