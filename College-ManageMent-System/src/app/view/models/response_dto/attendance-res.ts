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
