import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { GiphyState } from './giphy.reducers';

export const selectTrendingGiphy = (state: any) => state.trendingItems;

export const selectAllTrendingGiphy = createSelector(
    selectTrendingGiphy,
    (state: GiphyState) => state.trendingItems
);

export const selectPagination = createSelector(
    selectTrendingGiphy,
    (state: GiphyState) => state.pagination
);
