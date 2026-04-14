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
