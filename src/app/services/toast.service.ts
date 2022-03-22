import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

constructor(private toast: ToastrService) { }

  success(message: string, header?: string) {
    return this.toast.success(message, header ?? "Success")
  }

  error(message: string, header?: string) {
    return this.toast.error(message, header ?? "Error");
  }

}
