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
