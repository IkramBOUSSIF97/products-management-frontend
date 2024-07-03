import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  submitted = false;
  signinForm!: FormGroup;
  product : any = {} ;
  myNewProduct! : Product;

  constructor(private router: Router,private productService: ProductService ) {

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('formValue :', form.value);

      form.resetForm();
      this.product = {};
    } else {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    this.productService.addProduct(this.product).
     subscribe((data)=> {
      this.myNewProduct = data;
      this.productService.findProductById(this.myNewProduct)
      .subscribe((data)=> {
        console.log('Product found:', data);
          this.router.navigate(['/product/product-details', this.product.id]);
      },
      (error) => {
        console.error('Error fetching product:', error);
       // this.toastr.error('Failed to add product', 'Error');
      });
     });
  }



}
