export interface LibraryMemberReq {
    memberId: string;
    studentId: number;
    facultyId: number;
    libraryId: number;
    membershipStartDate: string; // ISO date
    membershipEndDate: string; // ISO date
    isActive: boolean;
}
