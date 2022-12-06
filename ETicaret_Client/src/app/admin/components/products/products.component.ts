import { ListComponent } from './list/list.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(){}

  ngOnInit(): void {
    
  }
  @ViewChild(ListComponent) listComponents : ListComponent;

  createdProduct(createdProduct :Create_Product ){
    this.listComponents.getProducts();

  }

}
