export interface UgProgramReq {
    programName: string;
    degreeType: string;
    durationYears: number;
    totalSemesters: number;
    totalCredits: number;
    eligibilityCriteria: string;
    annualFee: number;
    isActive: boolean;
    departmentId: number;
}
