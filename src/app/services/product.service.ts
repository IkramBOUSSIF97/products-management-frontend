import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { catchError, tap } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'https://dummyjson.com/products';
  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get<Product[]>(this.baseUrl)
      .pipe(
        tap((response) => console.log(response)),
        catchError(error => {
          console.error('Error fetching products:', error);
          throw error;
        }));
  }

  findProductById(id: any) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
    .pipe(
      tap((response) => {
        console.log(response);
      }),
      catchError(error => {
        console.error('Error fetching product:', error);
        throw error;
      })
    )

  }

  addProduct(product : Product) : Observable<Product> {
    const httpOptions = {
     headers : new HttpHeaders({ 'content-Type' : 'application/json' })
    };
    return this.http.post<Product>(this.baseUrl +'/add' ,product,httpOptions).pipe(
     tap((response) => console.log(response)),
     catchError(error => {
      console.error('error', error);
      throw error;
    }));
   }
}
