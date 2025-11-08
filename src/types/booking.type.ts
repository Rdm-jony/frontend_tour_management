import { IPayment } from "./payment.type";
import { ITour } from "./tour.type";
import { IUser } from "./user.type";

export enum BOOKING_STATUS {
    PENDING = "PENDING",
    CANCEL = "CANCEL",
    COMPLETE = "COMPLETE",
    FAILED = "FAILED"
}
export interface IBooking {
    _id?: string,
    tour: ITour | string,
    user: IUser | string,
    payment: IPayment,
    guestCount: number,
    status: BOOKING_STATUS,
    createdAt?: Date
}