import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '../../cors/service/api.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class LandingpageService {

  constructor(
  ) { }

  modalInstance: NgbModalRef | null = null;


}
