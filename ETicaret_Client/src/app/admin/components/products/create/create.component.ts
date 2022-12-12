import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { Create_Product } from './../../../../contracts/create_product';
import { ProductService } from './../../../../services/common/models/product.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private  productService :ProductService,
    private alertify : AlertifyService){}

  ngOnInit(): void {
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter(); //aynı anda eklenınce listede olsun diye

  create(name : HTMLInputElement,stock : HTMLInputElement,price: HTMLInputElement){
    const create_product: Create_Product = new  Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);
    
   
    this.productService.create(create_product,() =>{
      this.alertify.message("Ürün Başarıyla Eklenmiştir",{
        dismissOthers:true,
        messageType: MessageType.Success,
        position:Position.TopRight
      });
      this.createdProduct.emit(create_product);

    },errorMessage => {
          this.alertify.message(errorMessage,{
            dismissOthers:true,
            messageType:MessageType.Error,
            position: Position.TopRight
          })
    });
  }
}
