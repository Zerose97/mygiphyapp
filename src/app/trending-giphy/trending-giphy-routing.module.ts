import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendingGiphyComponent } from './trending-giphy.component';

const routes: Routes = [
  {
    path: '',
    component: TrendingGiphyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrendingGiphyRoutingModule { }
