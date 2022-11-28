import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { ProductsModule } from './../../admin/components/products/products.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    BasketsModule,
    HomeModule
  ]
})
export class ComponentsModule { }
