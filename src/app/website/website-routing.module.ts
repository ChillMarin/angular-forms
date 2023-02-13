import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AuthGuard } from '../guards/auth.guard';
import { ExitGuard } from '../guards/exit.guard';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {

        // como category ahora tiene otro modulo que se encarga de mostrar la categoria, se debe cambiar la ruta para que apunte a ese modulo y no a la pagina de categoria
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then((m) => m.CategoryModule),
        data:{
          preload:true,
        }
      },
      {
         //:id es un parámetro que se puede pasar a la ruta para validar el id de la categoria que queremos mostrar
        path: 'mycart/:id',
        component: MycartComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        canDeactivate: [ExitGuard],
        component: RegisterComponent,
      },
      {
        path: 'recovery',
        component: RecoveryComponent,
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
