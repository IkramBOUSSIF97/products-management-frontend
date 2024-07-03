import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'list', component: ProductsListComponent },
  { path: 'product-details/:id', component: ProductDetailComponent },
  { path: 'add-product', component: AddProductComponent }
]

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    NgxPaginationModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    HttpClient
  ],
})
export class ProductsModule { }
