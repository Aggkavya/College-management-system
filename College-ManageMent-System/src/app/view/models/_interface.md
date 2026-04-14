# Models Interfaces Reference

This file contains all the Request and Response DTOs and other models used in the application, grouped by their domain entity for easy context.

## Attendance
 
export interface AttendanceReq {
    lectureDate: string; // ISO date
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    status: string;
    remarks: string;
    lectureNumber: number;
    semester: number;
    studentId: number;
    subjectId: number;
}

export interface AttendanceRes {
    id: number;
    lectureDate: string; // ISO date
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    status: string;
    remarks: string;
    lectureNumber: number;
    semester: number;
    studentName: string;
    studentRollNo: string;
    subjectName: string;
    subjectCode: string;
}
 

## Book
 
export interface BookReq {
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    edition: number;
    totalCopies: number;
    availableCopies: number;
    category: string;
    shelfLocation: string;
    libraryId: number;
}

export interface BookRes {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    edition: number;
    totalCopies: number;
    availableCopies: number;
    category: string;
    shelfLocation: string;
    libraryName: string;
}
 

## Book Issue
 
export interface BookIssueReq {
    bookId: number;
    memberId: number;
    issueDate: string; // ISO date
    dueDate: string; // ISO date
    returnDate: string; // ISO date
    fineAmount: number;
    isReturned: boolean;
}

export interface BookIssueRes {
    id: number;
    bookTitle: string;
    memberName: string;
    issueDate: string; // ISO date
    dueDate: string; // ISO date
    returnDate: string; // ISO date
    fineAmount: number;
    isReturned: boolean;
}
 

## Bulk Attendance
 
import { AttendanceRecord } from "../attendance-record";

export interface BulkAttendanceReq {
    subjectId: number;
    date: string; // ISO date
    lectureNumber: number;
    records: AttendanceRecord[];
}
 

## Canteen
 
export interface CanteenReq {
    name: string;
    location: string;
    operatingHours: string;
    seatingCapacity: number;
    managerName: string;
    contactNumber: string;
    isVegetarian: boolean;
    isActive: boolean;
}

export interface CanteenRes {
    id: number;
    name: string;
    location: string;
    operatingHours: string;
    seatingCapacity: number;
    managerName: string;
    contactNumber: string;
    isVegetarian: boolean;
    isActive: boolean;
}
 

## Classroom
 
export interface ClassroomReq {
    roomNumber: string;
    building: string;
    floor: number;
    capacity: number;
    classroomType: "LECTURE_HALL" | "LABORATORY" | "SEMINAR_ROOM" | "COMPUTER_LAB" | "WORKSHOP" | "AUDITORIUM";
    hasProjector: boolean;
    hasAC: boolean;
    isAvailable: boolean;
    departmentId: number;
}

export interface ClassroomRes {
    id: number;
    roomNumber: string;
    building: string;
    floor: number;
    capacity: number;
    classroomType: "LECTURE_HALL" | "LABORATORY" | "SEMINAR_ROOM" | "COMPUTER_LAB" | "WORKSHOP" | "AUDITORIUM";
    hasProjector: boolean;
    hasAC: boolean;
    isAvailable: boolean;
    departmentName: string;
}
 

## Course
 
export interface CourseReq {
    courseTitle: string;
    stream: string;
    totalSemesters: number;
    durationYears: number;
    minCredits: number;
    level: string;
    departmentId: number;
}

export interface CourseRes {
    id: number;
    courseTitle: string;
    stream: string;
    totalSemesters: number;
    departmentName: string;
}
 

## Department
 
export interface Department {
    name: string,
    code: string,
    hodName: string,
    email: string,
    extensionNo: string
}

export interface DepartmentResponse {
    "name": string,
    "email": string,
    "hodName": string,
    "id": string,
    "code": string,
    "extensionNo": string
}
 

## Events
 
export interface EventsReq {
    eventTitle: string;
    organizer: string;
    venue: string;
    dateTime: string; // ISO datetime
    guestName: string;
    budgetAllocated: number;
    participantsCount: number;
    departmentId: number;
}

export interface EventsRes {
    id: number;
    eventTitle: string;
    organizer: string;
    venue: string;
    dateTime: string; // ISO datetime
    guestName: string;
    budgetAllocated: number;
    participantsCount: number;
    departmentName: string;
}
 

## Exam
 
export interface ExamReq {
    examType: string;
    session: string;
    examDate: string; // ISO date
    roomNumber: string;
    maxMarks: number;
    subjectId: number;
}

export interface ExamRes {
    id: number;
    examType: string;
    session: string;
    examDate: string; // ISO date
    roomNumber: string;
    maxMarks: number;
    subjectName: string;
    subjectCode: string;
}
 

## Faculty
 
export interface FacultyReq {
    fullName: string;
    employeeCode: string;
    designation: string;
    qualification: string;
    dateOfJoining: string; // ISO date
    salary: number;
    specialization: string;
    email: string;
    phone: string;
    cabinNo: string;
    departmentId: number;
}

export interface FacultyRes {
    id: number;
    fullName: string;
    employeeCode: string;
    designation: string;
    qualification: string;
    dateOfJoining: string; // ISO date
    salary: number;
    specialization: string;
    email: string;
    phone: string;
    cabinNo: string;
    departmentName: string;
}
 

## Fees
 
export interface FeesReq {
    transactionId: string;
    category: string;
    totalAmount: number;
    amountPaid: number;
    dueDate: string; // ISO date
    paymentMode: string;
    paymentStatus: "PAID" | "PENDING" | "FAILED",
    studentId: number;
}

export interface FeesRes {
    id: number;
    transactionId: string;
    category: string;
    totalAmount: number;
    amountPaid: number;
    dueDate: string; // ISO date
    paymentMode: string;
    paymentStatus: "PAID" | "PENDING" | "FAILED";
    studentName: string;
    studentRollNo: string;
}
 

## Hostel
 
export interface HostelReq {
    hostelName: string;
    roomNumber: string;
    floorNumber: number;
    blockName: string;
    roomType: string;
    messFee: number;
    hostelFee: number;
    isOccupied: boolean;
    studentId: number;
}

export interface HostelRes {
    id: number;
    hostelName: string;
    roomNumber: string;
    floorNumber: number;
    blockName: string;
    roomType: string;
    messFee: number;
    hostelFee: number;
    isOccupied: boolean;
    studentName: string;
    studentRollNo: string;
}
 

## Infrastructure
 
export interface InfrastructureReq {
    roomOrLabName: string;
    floor: number;
    block: string;
    capacity: number;
    hasProjector: boolean;
    noOfComputers: number;
    status: string;
    departmentId: number;
}

export interface InfrastructureRes {
    id: number;
    roomOrLabName: string;
    floor: number;
    block: string;
    capacity: number;
    hasProjector: boolean;
    noOfComputers: number;
    status: string;
    departmentName: string;
}
 

## Library
 
export interface LibraryReq {
    name: string;
    location: string;
    totalBooks: number;
    totalSeats: number;
    openingTime: string;
    closingTime: string;
    librarianId: number;
}

export interface LibraryRes {
    id: number;
    name: string;
    location: string;
    totalBooks: number;
    totalSeats: number;
    openingTime: string;
    closingTime: string;
    librarianName: string;
}
 

## Library Member
 
export interface LibraryMemberReq {
    memberId: string;
    studentId: number;
    facultyId: number;
    libraryId: number;
    membershipStartDate: string; // ISO date
    membershipEndDate: string; // ISO date
    isActive: boolean;
}

export interface LibraryMemberRes {
    id: number;
    memberId: string;
    memberName: string;
    memberType: string;
    libraryName: string;
    membershipStartDate: string; // ISO date
    membershipEndDate: string; // ISO date
    isActive: boolean;
}
 

## PG Student
 
export interface PgStudentReq {
    studentId: number;
    researchTopic: string;
    supervisorName: string;
    thesisTitle: string;
    pgStartDate: string; // ISO date
    expectedCompletionDate: string; // ISO date
    programType: string;
    isThesisSubmitted: boolean;
}

export interface PgStudentRes {
    id: number;
    studentName: string;
    rollNo: string;
    researchTopic: string;
    supervisorName: string;
    thesisTitle: string;
    pgStartDate: string; // ISO date
    expectedCompletionDate: string; // ISO date
    programType: string;
    isThesisSubmitted: boolean;
}
 

## Results
 
export interface ResultsReq {
    marksObtained: number;
    internalMarks: number;
    externalMarks: number;
    gradePoint: string;
    status: "PASS" | "FAIL" | "ATKT";
    attemptNumber: number;
    studentId: number;
    examId: number;
}

export interface ResultsRes {
    id: number;
    marksObtained: number;
    internalMarks: number;
    externalMarks: number;
    gradePoint: string;
    status: "PASS" | "FAIL" | "ATKT";
    attemptNumber: number;
    studentName: string;
    studentRollNo: string;
    examSession: string;
    subjectName: string;
}
 

## Student
 
export interface StudentReq {
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
    departmentId: number;
    courseId: number;
}

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
 

## Subject
 
export interface SubjectReq {
    subName: string;
    subCode: string;
    subType: string;
    credits: number;
    maxMarks: number;
    passingMarks: number;
    semesterNumber: number;
    courseId: number;
    facultyId: number;
}

export interface SubjectRes {
    id: number;
    subName: string;
    subCode: string;
    credits: number;
    courseName: string;
    facultyName: string;
}
 

## UG Program
 
export interface UgProgramReq {
    programName: string;
    degreeType: string;
    durationYears: number;
    totalSemesters: number;
    totalCredits: number;
    eligibilityCriteria: string;
    annualFee: number;
    isActive: boolean;
    departmentId: number;
}

export interface UgProgramRes {
    id: number;
    programName: string;
    degreeType: string;
    durationYears: number;
    totalSemesters: number;
    totalCredits: number;
    eligibilityCriteria: string;
    annualFee: number;
    isActive: boolean;
    departmentName: string;
}
 

## Miscellaneous Models

### Attendance Percentage
 
export interface AttendancePercentage {
    studentId: number;
    subjectId: number;
    percentage: number;
    totalClasses: number;
    attendedClasses: number;
}
 
### Attendance Record
export interface AttendanceRecord {
    studentId: number;
    status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
}
 

### Dashboard Stats
export interface DashboardStats {
    totalStudents: number;
    totalFaculty: number;
    activeBooksIssued: number;
    unpaidFees: number;
    upcomingExams: number;
    upcomingEvents: number;
}
 

### Defaulter
export interface Defaulter {
    studentId: number;
    studentName: string;
    subjectId: number;
    subjectName: string;
    presentCount: number;
    totalCount: number;
    percentage: number;
}

export interface DefaulterRes {
}

### Results Summary
import { SubjectResult } from "./subject-result";

export interface ResultsSummary {
    studentId: number;
    studentName: string;
    overallPercentage: number;
    overallGrade: string;
    subjectResults: SubjectResult[];
}
 

### Subject Result
 
export interface SubjectResult {
    subjectName: string;
    marksObtained: number;
    totalMarks: number;
    grade: string;
    status: "PASS" | "FAIL" | "ATKT";
}
 
