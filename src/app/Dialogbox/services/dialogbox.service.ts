import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';


@Injectable({
  providedIn: 'root'
})
export class DialogboxService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm' | 'lg' = 'sm',
    type: 'success' | 'error' | 'delete' | 'creation' | 'Warning' | 'info' = 'success'): Promise<boolean> {
    const modalRef = this.modalService.open(DialogboxComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    modalRef.componentInstance.type = type; // Pass the type to the component

    return modalRef.result;
  }
}
