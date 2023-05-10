import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'trending',
    loadChildren: () =>
      import('./trending-giphy/trending-giphy.module').then((m) => m.TrendingGiphyModule),
  },
  {
    path: '',
    redirectTo: 'trending',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
