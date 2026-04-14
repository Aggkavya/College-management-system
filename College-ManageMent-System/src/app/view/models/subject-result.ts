export interface SubjectResult {
    subjectName: string;
    marksObtained: number;
    totalMarks: number;
    grade: string;
    status: "PASS" | "FAIL" | "ATKT";
}
