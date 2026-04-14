import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../../services/department/department.service';
import { DepartmentResponse } from '../../../models/response_dto/department';

@Component({
  selector: 'app-department',
  standalone: false,
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {

  departmentForm: FormGroup;
  department: DepartmentResponse[] = [];

  showForm = false;
  editingId: string | number | null = null;

  constructor(private fb: FormBuilder, private dp: DepartmentService) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.minLength(2)]],
      hodName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      extensionNo: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]{3,6}$/)]
      ]
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.dp.getDepts().subscribe({
      next: (res) => this.department = res,
      error: (err) => console.log(err)
    });
  }

  toggleForm() {
    this.showForm = true;
    this.editingId = null;
    this.departmentForm.reset();
  }

  closeForm() {
    this.showForm = false;
    this.editingId = null;
    this.departmentForm.reset();
  }

  onSubmit() {
    if (this.departmentForm.invalid) return;
    const payload = this.departmentForm.value;
    console.log(payload);
    if (this.editingId !== null) {
      this.dp.updateDept(this.editingId, payload).subscribe({
        next: () => {
          this.loadAll();
          this.closeForm();
        },
        error: (err) => console.log(err)
      });
    } else {
      this.dp.addDept(payload).subscribe({
        next: () => {
          this.loadAll();
          this.closeForm();
        },
        error: (err) => console.log(err)
      });
    }
  }

  editDepartment(dept: DepartmentResponse) {
    this.showForm = true;
    this.editingId = dept.id;

    this.departmentForm.patchValue({
      name: dept.name,
      code: dept.code,
      hodName: dept.hodName,
      email: dept.email,
      extensionNo: dept.extensionNo
    });
  }

  deleteDepartment(id: number | string) {
    if (!confirm('Delete this department?')) return;

    this.dp.deleteDept(id).subscribe({
      next: () => this.loadAll(),
      error: (err) => console.log(err)
    });
  }
}