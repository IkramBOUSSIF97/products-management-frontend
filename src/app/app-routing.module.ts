import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

const routes: Routes = [
  {path:'', redirectTo:'welcome-page', pathMatch:'full'},
  {path: "welcome-page", component:WelcomePageComponent},
  {path:"product", loadChildren:() => import("./modules/products/products.module").then(m=>m.ProductsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
