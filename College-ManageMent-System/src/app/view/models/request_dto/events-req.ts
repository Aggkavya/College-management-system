export interface EventsReq {
    eventTitle: string;
    organizer: string;
    venue: string;
    dateTime: string; // ISO datetime
    guestName: string;
    budgetAllocated: number;
    participantsCount: number;
    departmentId: number;
}
