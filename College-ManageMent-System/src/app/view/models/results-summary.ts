import { SubjectResult } from "./subject-result";

export interface ResultsSummary {
    studentId: number;
    studentName: string;
    overallPercentage: number;
    overallGrade: string;
    subjectResults: SubjectResult[];
}
