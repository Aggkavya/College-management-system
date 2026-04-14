export interface StudentRes {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    dob: string; // ISO date string
    rollNo: string;
    email: string;
    phone: string;
    currentSemester: number;
    admissionYear: number;
    status: string;
    address: string;
    enrollmentNumber: string;
    admissionType: string;
    bloodGroup: string;
    profileImageUrl: string;
    isActive: boolean;
    departmentName: string;
    courseName: string;
}
