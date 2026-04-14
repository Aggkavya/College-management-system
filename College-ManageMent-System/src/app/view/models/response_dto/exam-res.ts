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
