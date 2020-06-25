import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { HomeComponent } from './home/home.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { HoteisComponent } from './hoteis/hoteis.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'voos', component: HomeComponent},
    { path: 'hoteis', component: HoteisComponent},
    { path: 'login', component: LoginComponent},
    { path: 'carrinho', component: CarrinhoComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'car', component: CarrinhoComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
]; // sets up routes constant where you define your routes


// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
