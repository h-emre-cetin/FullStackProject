import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { reference } from '@popperjs/core';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private _http: HttpClient,
    private modalService: NgbModal) { }

  //connect frontend to backend

  apiUrl= 'http://localhost:3000/employees';

  // get all data

  getAllData():Observable<any>{
    return this._http.get(`${this.apiUrl}`);
  }

  


  // onSubmit(f:NgForm){
  //   return this._http.get(this.apiUrl, f.value)
  // }

}
