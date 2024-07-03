import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: any;
  listOfproducts: any[] = [];
  myProducts: any[] = [];
  p: number = 1;
  itemsPerPage: number = 8;
  totalProduct?: number;
  productsList: any;

  showNoResultsMessage: boolean = false;

  private viewProductsByCriteria = new Subject<string>();
  private viewProductsSubscription?: Subscription;

  searchTerm: string = '';

  constructor(private router: Router,private productService : ProductService) {
  }

  ngOnInit() {
    this.getAllProducts();

    this.viewProductsSubscription = this.viewProductsByCriteria.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.fakeSearch(term))
    ).subscribe(filteredProducts => {
      this.myProducts = filteredProducts;
      this.checkResultsLength();
    });
  }

  private checkResultsLength() {
    this.showNoResultsMessage = this.myProducts.length === 0;
  }

  ngOnDestroy() {
    this.viewProductsSubscription?.unsubscribe();
  }

  getAllProducts() {
    this.productService.getProductList()
    .subscribe(productList => {
          console.log("myListOfProduct",productList);
          this.products = productList;
          this.listOfproducts = [...this.products.products];
          this.totalProduct = this.listOfproducts.length;
          this.myProducts = [...this.listOfproducts];
          this.checkResultsLength();
    });
  }

  goToDetailProduct(productId: number) {
    this.router.navigate(['product/product-details/' + `${productId}`]);
  }

  checkIsProductNew(creationDate: Date): boolean {
    const currentDate = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);
    return creationDate >= threeDaysAgo;
  }

  addProduct(): void {
    this.router.navigate(['product/add-product']);
  }

  onSearchInputChange() {
    if (this.searchTerm.trim() === '') {
      // if searchTerm is empty , refresh the list of product
      this.getAllProducts();
    } else {
      this.viewProductsByCriteria.next(this.searchTerm.trim());
      console.log('Search term:', this.searchTerm);
      this.checkResultsLength();
    }
  }

  fakeSearch(term: string): Observable<any[]> {
    if (!term) {
      return of([...this.listOfproducts]);
    } else {
      const filteredProducts: any[] = this.listOfproducts.filter((product: any) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
      return of(filteredProducts);
    }
  }
}
