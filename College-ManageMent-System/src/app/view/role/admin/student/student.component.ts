import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student/student.service';
import { StudentRes } from '../../../models/response_dto/student-res';
import { StudentReq } from '../../../models/request_dto/student-req';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
  standalone: false
})
export class StudentComponent implements OnInit {

  students: StudentRes[] = [];
  departments: any[] = [];
  courses: any[] = [];
  genders = ['MALE', 'FEMALE', 'OTHER'];

  statuses = ['ACTIVE', 'INACTIVE', 'GRADUATED', 'DROPPED'];

  admissionTypes = ['REGULAR', 'LATERAL', 'MANAGEMENT', 'NRI', 'SCHOLARSHIP'];

  bloodGroups = [
    'A_POSITIVE', 'A_NEGATIVE',
    'B_POSITIVE', 'B_NEGATIVE',
    'O_POSITIVE', 'O_NEGATIVE',
    'AB_POSITIVE', 'AB_NEGATIVE'
  ];

  formData: StudentReq = this.getEmptyForm();

  isEditMode = false;
  selectedId: number | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadDepartments();
    this.loadCourses();
  }

  // ✅ EMPTY FORM TEMPLATE
  getEmptyForm(): StudentReq {
    return {
      firstName: '',
      lastName: '',
      gender: 'MALE',
      dob: '',
      rollNo: '',
      email: '',
      phone: '',
      currentSemester: 1,
      admissionYear: new Date().getFullYear(),
      status: 'ACTIVE',
      address: '',
      enrollmentNumber: '',
      admissionType: null,
      bloodGroup: null,
      profileImageUrl: '',
      departmentId: null as unknown as number, 
      courseId: null as unknown as number      
    };
  }

  // ✅ LOAD ALL
  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (res) => {
        this.students = res;
      },
      error: (err) => {
        console.error("Error fetching students", err);
      }
    });
  }

  // ✅ CREATE / UPDATE
  submitForm() {
    
  if (!this.formData.bloodGroup) this.formData.bloodGroup = null;
  if (!this.formData.admissionType) this.formData.admissionType = null;

  // 🔥 ENROLLMENT FIX (ADD HERE)
  if (!this.formData.enrollmentNumber) {
    this.formData.enrollmentNumber = null;
  }

  // ✅ VALIDATION
  if (!this.formData.firstName || 
      !this.formData.rollNo || 
      !this.formData.departmentId || 
      !this.formData.courseId) {
    alert("Please fill all required fields");
    return;
  }
  if (this.isEditMode && this.selectedId) {
    this.studentService.updateStudent(this.selectedId, this.formData).subscribe({
      next: () => {
        alert("Student updated successfully");
        this.resetForm();
        this.loadStudents();
      },
      error: (err) => alert(err.error?.message || "Update failed")
    });
  } else {
    this.studentService.addStudent(this.formData).subscribe({
      next: () => {
        alert("Student created successfully");
        this.resetForm();
        this.loadStudents();
      },
      error: (err) => alert(err.error?.message || "Create failed")
    });
  }
}

  // ✅ EDIT (FIXED PROPER MAPPING)
  editStudent(student: StudentRes) {
    this.formData = {
      firstName: student.firstName,
      lastName: student.lastName || '',
      gender: student.gender as any,
      dob: student.dob || '',
      rollNo: student.rollNo,
      email: student.email || '',
      phone: student.phone || '',
      currentSemester: student.currentSemester,
      admissionYear: student.admissionYear,
      status: student.status as any,
      address: student.address || '',
      enrollmentNumber: student.enrollmentNumber || '',
      admissionType: student.admissionType || null,
      bloodGroup: student.bloodGroup || null,
      profileImageUrl: student.profileImageUrl || '',

      // ❗ TEMP FIX (until dropdowns added)
      departmentId: this.departments.find(d => d.name === student.departmentName)?.id ?? null,
      courseId: this.courses.find(c => c.courseTitle === student.courseName)?.id ?? null

    };

    this.selectedId = student.id;
    this.isEditMode = true;
  }

  // ✅ DELETE
  deleteStudent(id: number) {
  if (confirm("Are you sure you want to delete this student?")) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }
}

  // ✅ RESET
  resetForm() {
    this.formData = this.getEmptyForm();
    this.isEditMode = false;
    this.selectedId = null;
  }

  loadDepartments() {
  this.studentService.getDepartments().subscribe({
    next: (res) => this.departments = res,
    error: (err) => console.error("Error loading departments", err)
  });
}

loadCourses() {
  this.studentService.getCourses().subscribe({
    next: (res) => this.courses = res,
    error: (err) => console.error("Error loading courses", err)
  });
}


}