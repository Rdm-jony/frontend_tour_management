import { IUser } from "./user.type";

export interface IReview {
  _id?: string;
  user: IUser;
  tour: string;
  rating: number;
  comment: string;
  createdAt?:string | null
}
