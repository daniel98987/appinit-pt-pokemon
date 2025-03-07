import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor() { }

  public alert(title: string, message: string,icon: SweetAlertIcon  = 'success') {
    Swal.fire({
      title: title,
      text: message,
      icon:icon,
      confirmButtonText: 'OK'
    });
  }


   public confirmAlert(title: string, message: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }
}
