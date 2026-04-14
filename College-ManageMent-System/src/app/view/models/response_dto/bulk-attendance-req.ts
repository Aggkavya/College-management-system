import { AttendanceRecord } from "../attendance-record";

export interface BulkAttendanceReq {
    subjectId: number;
    date: string; // ISO date
    lectureNumber: number;
    records: AttendanceRecord[];
}
