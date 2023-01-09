import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';

const routes: Routes = [
  // Esto es lo que hace es una redirección a la ruta home si el path es vacio
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },

  // llamamos el modulo de cms y esto lo que nos habilita poder hacer lazyLoading y Code Splitting
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data:{
      preload: true
    }
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule),
  },
  // se coloca afuera para que sea global
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    //Pre carga de modulos
    preloadingStrategy: CustomPreloadService,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
