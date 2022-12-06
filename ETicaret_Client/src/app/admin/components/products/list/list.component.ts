import { AlertifyService, MessageType, Position } from './../../../../services/admin/alertify.service';
import { ProductService } from './../../../../services/common/models/product.service';
import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from 'src/app/contracts/list_product';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(private productService: ProductService,
    private alertifyService :AlertifyService){}

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate'];
  dataSource : MatTableDataSource<List_Product>  = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;


   async getProducts(){
    const allProducts : {totalCount:number; products:List_Product[]} =  await this.productService.read(this.paginator ?  this.paginator.pageIndex:0,this.paginator ?  this.paginator.pageSize:5,()=> errorMessage => this.alertifyService.message(errorMessage,{
      dismissOthers : true,
      messageType:MessageType.Error,
      position: Position.TopRight
    }))
 
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length= allProducts.totalCount;
    
    
  }

  async pageChanged(){
    await this.getProducts();
  }
  
 async ngOnInit() {
    await  this.getProducts();
 }
   
}

