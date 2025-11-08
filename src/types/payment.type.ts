import { IBooking } from "./booking.type";

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum PAYMENT_STATUS {
    PAID = "PAID",
    UNPAID = "UNPAID",
    CANCELLED = "CANCELLED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}
export interface IPayment{
    booking:IBooking,
    transactionId:string,
    amount:number,
    paymentGatewayData?:any,
    invoiceUrl?:string,
    status?:PAYMENT_STATUS
}