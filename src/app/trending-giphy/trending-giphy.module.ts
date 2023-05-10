import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrendingGiphyRoutingModule } from './trending-giphy-routing.module';
import { TrendingGiphyComponent } from './trending-giphy.component';
import { GiphyService } from '../@core/services/giphy.service';
import { HttpClientModule } from '@angular/common/http';
import { InViewportModule } from 'ng-in-viewport';


@NgModule({
  declarations: [
    TrendingGiphyComponent
  ],
  imports: [
    CommonModule,
    TrendingGiphyRoutingModule,
    InViewportModule
  ],
  providers: [
    GiphyService
  ]
})
export class TrendingGiphyModule { }
