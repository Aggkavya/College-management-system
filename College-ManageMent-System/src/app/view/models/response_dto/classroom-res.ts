export interface ClassroomRes {
    id: number;
    roomNumber: string;
    building: string;
    floor: number;
    capacity: number;
    classroomType: "LECTURE_HALL" | "LABORATORY" | "SEMINAR_ROOM" | "COMPUTER_LAB" | "WORKSHOP" | "AUDITORIUM";
    hasProjector: boolean;
    hasAC: boolean;
    isAvailable: boolean;
    departmentName: string;
}
