import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  constructor(
    private _http: HttpClient,
    private service: EmployeeServiceService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  closeResult: string;
  employees: Employee[];
  employee: Employee;
  editForm: FormGroup;
  deleteId: string;
  ngOnInit(): void {
    this.service.getAllData().subscribe((res) => {
      console.log(res);
      this.employees = res;
    });

    this.editForm = this.fb.group({
      _id: [''],
      name: [''],
      position: [''],
      office: [''],
      salary: Number,
    });
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    const url = 'http://localhost:3000/employees';
    this._http.post(url, f.value).subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openEdit(targetModal: any, employee: Employee) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
    });
    this.editForm.patchValue({
      _id: employee._id,
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary,
    });
  }

  onSave() {
    const editURL =
      'http://localhost:3000/employees/' + this.editForm.value._id;
    console.log(this.editForm.value);
    this._http.put(editURL, this.editForm.value).subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }

  openDelete(targetModal:any, employee: Employee) {
    this.deleteId = employee._id;
    this.modalService.open(targetModal,{
      backdrop:'static',
      size:'lg'
    })
  }

  onDelete(){
    const deleteUrl = 'http://localhost:3000/employees/' + this.deleteId;
    this._http.delete(deleteUrl).subscribe((result)=>{
      this.ngOnInit();
      this.modalService.dismissAll();
    });
  }
}
