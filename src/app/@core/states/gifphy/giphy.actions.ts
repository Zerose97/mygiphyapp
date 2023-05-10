import { createAction, props } from "@ngrx/store";
import { GifItem, Meta, Pagination } from "../../models/gifphy.model";


export const loadTrendingGif = createAction(
    '[Trending page] Load Trending Gifs',
    props<{skipRecords: number, takeRecords: number, searchKey: string}>()
)

export const loadTrendingGifSuccess = createAction(
    '[Trending page] Load Trending Gifs Success',
    props<{data: GifItem[], pagination: Pagination}>()
)

export const loadTrendingGifFailure = createAction(
    '[Trending page] Load Trending Gifs Failed',
    props<{ error: string }>()
)
