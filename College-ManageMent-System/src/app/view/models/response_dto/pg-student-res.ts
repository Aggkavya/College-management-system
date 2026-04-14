export interface PgStudentRes {
    id: number;
    studentName: string;
    rollNo: string;
    researchTopic: string;
    supervisorName: string;
    thesisTitle: string;
    pgStartDate: string; // ISO date
    expectedCompletionDate: string; // ISO date
    programType: string;
    isThesisSubmitted: boolean;
}
