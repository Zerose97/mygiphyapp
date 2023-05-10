import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";
import { GiphyService } from "../../services/giphy.service";
import * as GiphyAction from "./giphy.actions";
import { catchError, map, of, switchMap, mergeMap } from "rxjs";

@Injectable()
export class GiphyEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private giphyService: GiphyService
    ) {}

    loadGiphyTrending$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GiphyAction.loadTrendingGif),
            switchMap((params) => {
                const queryParam = {
                    limit: params.takeRecords,
                    offset: params.skipRecords,
                    q: params.searchKey
                }
                return (params.searchKey ? this.giphyService.getSearchGiphy(queryParam) : this.giphyService.getTrendingGiphy(queryParam)).pipe(
                    map((res) => {
                        return GiphyAction.loadTrendingGifSuccess({data: res.data, pagination: res.pagination})
                    }),
                    catchError((error) => {
                        return of(GiphyAction.loadTrendingGifFailure({error}))
                    })
                )
            })
        )
    )
}