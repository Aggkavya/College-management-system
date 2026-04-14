export interface PgStudentReq {
    studentId: number;
    researchTopic: string;
    supervisorName: string;
    thesisTitle: string;
    pgStartDate: string; // ISO date
    expectedCompletionDate: string; // ISO date
    programType: string;
    isThesisSubmitted: boolean;
}
