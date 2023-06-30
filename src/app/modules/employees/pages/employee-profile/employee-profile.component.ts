import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../service/employees.service';
import { Employee, Employee2 } from '../interface/employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit{
  myProfile:  Employee2[]=[];
  id: any;
  

  perfilEditForm: FormGroup = new FormGroup({
    employeeName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    employeeCharge: new FormControl(null, [Validators.required]),
    employeeEmail: new FormControl(null, [Validators.required, Validators.email]),
    employeeKnowledge: new FormControl(null, [Validators.required]),
    employeeId: new FormControl(),
    employeeCurrentPassword: new FormControl(null, [Validators.required]),
    employeeNewPassword: new FormControl(null, [Validators.required])

  })

  constructor(
        private employeeService: EmployeesService
  ){}

   ngOnInit(): void {
    this.id= localStorage.getItem('id');
    this.getEmployeeById(this.id)    
  }

  getEmployeeById(id: string | null) {
    this.employeeService.getEmployeeById(id).subscribe(resp => {
      this.myProfile = resp;
      this.perfilEditForm.patchValue({
        employeeName: resp.employeeName,
        employeeCharge: resp.employeeCharge,
        employeeEmail: resp.employeeEmail,
        employeeKnowledge: resp.employeeKnowledge
      })
    })
  }

  editPerfilEmployee() {
    if (this.perfilEditForm.valid) {
      const data = {
        employeeName: this.perfilEditForm.get('employeeName')?.value,
        employeeCharge: this.perfilEditForm.get('employeeCharge')?.value,
        employeeEmail: this.perfilEditForm.get('employeeEmail')?.value,
        employeePassword:this.perfilEditForm.get('employeeNewPassword')?.value,
        employeeKnowledge: this.perfilEditForm.get('employeeKnowledge')?.value,
      }

      const employeeCurrentPassword= this.perfilEditForm.get('employeeCurrentPassword')?.value;

      this.employeeService.updateEmployee2(this.id, employeeCurrentPassword,  data).subscribe((res) =>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Empleado editado',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          customClass: {
            container: 'my-swal-container',
            title: 'my-swal-title',
            icon: 'my-swal-icon',
            popup: 'my-swal-popup',
          },
        }),
        this.perfilEditForm.reset();
      })

    }

  }




  

}
