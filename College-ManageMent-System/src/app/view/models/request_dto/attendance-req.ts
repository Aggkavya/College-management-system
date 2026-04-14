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
