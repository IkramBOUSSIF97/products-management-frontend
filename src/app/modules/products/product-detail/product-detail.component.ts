import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product!: any;
  subscription: any;


  constructor(private router: ActivatedRoute, private http: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {
    const productId : string | null= this.router.snapshot.paramMap.get('id');
    if(productId) {
      this.findById(+productId)
    }
    // else {
    //    this.product = undefined;
    // }
  }

  findById(id : number) {
    this.productService.findProductById(id)
       .subscribe((data)=>{
        console.log("data",data);
        this.product = data;
       });
  }
}
