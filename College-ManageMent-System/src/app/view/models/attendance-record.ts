export interface AttendanceRecord {
    studentId: number;
    status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
}
