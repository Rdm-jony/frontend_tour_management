export enum BOOKING_STATUS {
    PENDING = "PENDING",
    CANCEL = "CANCEL",
    COMPLETE = "COMPLETE",
    FAILED = "FAILED"
}
export interface IBooking {
    tour: string,
    user: string,
    payment?: string,
    guestCount: number,
    status: BOOKING_STATUS,
    createdAt?: Date
}