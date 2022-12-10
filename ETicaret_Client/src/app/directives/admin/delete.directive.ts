import { ProductService } from './../../services/common/models/product.service';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

declare var $ : any //js kullanacağımdan dolayı

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element : ElementRef,
    private _renderer : Renderer2,
    private productService: ProductService
    ) { 

      const img = _renderer.createElement("img");
      img.setAttribute("src","../../../../../assets/delete.png");
      img.setAttribute("style","cursor:pointer");
      img.width = 25;
      img.height= 25;

      _renderer.appendChild(element.nativeElement,img)
    }



   @Input() id: string; //id değerini yakalamalk için
   @Output() callback:EventEmitter<any> = new EventEmitter();

    @HostListener("click") //işaretlenen metod tetiklenecek.
     async onclick(){
      const td : HTMLTableCellElement = this.element.nativeElement;
      await this.productService.delete(this.id);
      $(td.parentElement).fadeOut(2000, () => {
        this.callback.emit();
      });

    }


   
}
