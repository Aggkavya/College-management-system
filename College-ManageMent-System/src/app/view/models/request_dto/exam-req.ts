export interface ExamReq {
    examType: string;
    session: string;
    examDate: string; // ISO date
    roomNumber: string;
    maxMarks: number;
    subjectId: number;
}
