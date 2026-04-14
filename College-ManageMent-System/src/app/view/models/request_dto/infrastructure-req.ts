export interface InfrastructureReq {
    roomOrLabName: string;
    floor: number;
    block: string;
    capacity: number;
    hasProjector: boolean;
    noOfComputers: number;
    status: string;
    departmentId: number;
}
