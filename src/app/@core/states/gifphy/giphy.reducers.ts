import { createReducer, on } from "@ngrx/store";
import { GifItem, Pagination } from "../../models/gifphy.model";
import { loadTrendingGif, loadTrendingGifFailure, loadTrendingGifSuccess } from "./giphy.actions";

export interface GiphyState {
    trendingItems: GifItem[];
    pagination: Pagination | null;
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}
  
export const initialState: GiphyState = {
    trendingItems: [],
    pagination: null,
    error: null,
    status: 'pending',
};

export const giphyTrendingReducer = createReducer(
    initialState,
    on(loadTrendingGif, (state) => ({
        ...state,
        status: 'loading'
    })),
    on(loadTrendingGifSuccess, (state, {data, pagination}) => ({
        ...state,
        trendingItems: pagination.offset > 0 ? [...state.trendingItems, ...data] : data,
        pagination: pagination,
        error: null,
        status: 'success'
    })),
    on(loadTrendingGifFailure, (state, {error}) => ({
        ...state,
        error: error,
        status: 'error'
    })),
)