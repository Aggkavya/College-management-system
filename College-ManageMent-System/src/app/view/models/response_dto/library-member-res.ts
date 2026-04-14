export interface LibraryMemberRes {
    id: number;
    memberId: string;
    memberName: string;
    memberType: string;
    libraryName: string;
    membershipStartDate: string; // ISO date
    membershipEndDate: string; // ISO date
    isActive: boolean;
}
