import { List_Product } from './../../../contracts/list_product';
import { Create_Product } from './../../../contracts/create_product';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService : HttpClientService  ) { }
  

  create(product : Create_Product , successCallBack?:()=> void , errorCallBack?: (errorMessage:string) => void){
    this.httpClientService.post({
      controller:"products"
    },product)
    .subscribe(result =>{
      successCallBack();
    },(errorResponse: HttpErrorResponse) =>{
      const _error: Array<{key:string ,value:Array<string>}> = errorResponse.error;
      let message="";
      _error.forEach((v, index) =>{
        v.value.forEach((_v,_index)=>{
           message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
     
    });
  }


 async read(page : Number=0, size : Number=5, successCallBack?:()=> void , errorCallBack?: (errorMessage:string) => void) : Promise<{totalCount:number; products:List_Product[]}>{
   const promiseData: Promise<{totalCount:number; products:List_Product[]}> =  this.httpClientService.get< {totalCount:number; products:List_Product[]}>({
         controller:"products",
         queryString:`page=${page}&size=${size}`
    }).toPromise() // gelen veriyi  bekleme işlemini sağlayabiliriz.

    promiseData.then(d => successCallBack()) //başarı durumuda
       .catch ((errorResponse :HttpErrorResponse) => errorCallBack(errorResponse.message)) //olumsuz durumda.

    return await  promiseData;
  }


 }
