import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ETicaret_Client';
  constructor(private toastrService:CustomToastrService ){
    toastrService.message("Merhaba","Ayşe BAYRAK", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopCenter
    })
  }
    
} 

