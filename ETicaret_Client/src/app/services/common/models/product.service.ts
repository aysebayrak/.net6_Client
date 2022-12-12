import { List_Product } from './../../../contracts/list_product';
import { Create_Product } from './../../../contracts/create_product';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService : HttpClientService  ) { }
  

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "products"
    }, product)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

 

 
  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number; products: List_Product[] }> {
    const observable: Observable<{ totalProductCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalProductCount: number; products: List_Product[] }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    });
  
    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
       .catch(error => errorCallBack(error));
  
    return await promiseData;
  }
  

 async delete(id: string){
  const deleteObservable : Observable<any> =  this.httpClientService.delete<any>({
    controller:"products"
  },id);
  await firstValueFrom(deleteObservable);

  }


}



























 // async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number; products: List_Product[] }> {
  //   const promiseData: Promise<{ totalProductCount: number; products: List_Product[] }> = this.httpClientService.get<{ totalProductCount: number; products: List_Product[] }>({
  //     controller: "products",
  //     queryString: `page=${page}&size=${size}`
  //   }).toPromise();

  //   promiseData.then(d => successCallBack())
  //     .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

  //   return await promiseData;
  // }