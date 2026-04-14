export interface EventsRes {
    id: number;
    eventTitle: string;
    organizer: string;
    venue: string;
    dateTime: string; // ISO datetime
    guestName: string;
    budgetAllocated: number;
    participantsCount: number;
    departmentName: string;
}
