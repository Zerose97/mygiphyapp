import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GifItem, GifTrendingDataApi } from '../models/gifphy.model';
import { map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GiphyService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getTrendingGiphy(params: any): Observable<GifTrendingDataApi> {
    let url = `https://api.giphy.com/v1/gifs/trending`
    return this.httpClient.get<GifTrendingDataApi>(url, {params}).pipe(map(dataApi => this.handleGifData(dataApi)));
  }

  getSearchGiphy(params: any): Observable<GifTrendingDataApi> {
    let url = `https://api.giphy.com/v1/gifs/search`
    return this.httpClient.get<GifTrendingDataApi>(url, {params}).pipe(map(dataApi => this.handleGifData(dataApi)));
  }

  // handle Data
  private handleGifData(dataApi: GifTrendingDataApi): GifTrendingDataApi {
    const mappingData = (g: GifItem) => {
      const preview_gif = g.images.preview_gif;
      const original =  g.images.original;
      return {
        ...g,
        rating: g.rating.toUpperCase(),
        properties: {
          ogGif: original.url,
          preGif: preview_gif.url,
          size: this.formatBytes(original.size),
          height: original.height,
          width: original.width
        }
      }
    }
    
    const returnData = {
      ...dataApi,
      data: dataApi.data.map(g => mappingData(g))
    }
    return returnData;
  }

  private formatBytes(bytes: any, decimals = 2) { 
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

  
}
