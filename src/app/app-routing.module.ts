import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'sign-page', loadChildren: './sign-page/sign-page.module#SignPagePageModule' },
  { path: 'sign-pad', loadChildren: './sign-pad/sign-pad.module#SignPadPageModule' },
  { path: 'redirect', loadChildren: './redirect/redirect.module#RedirectPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
