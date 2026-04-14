export interface FeesReq {
    transactionId: string;
    category: string;
    totalAmount: number;
    amountPaid: number;
    dueDate: string; // ISO date
    paymentMode: string;
    paymentStatus: "PAID" | "PENDING" | "FAILED",
    studentId: number;
}
