import { ITourType } from "./category.type";
import { IDivision } from "./division.type";

export interface ITour {
    _id?: string
    title: string;
    slug: string;
    description?: string;
    images?: string[];
    location?: string;
    costForm?: number;
    startDate?: Date;
    endDate?: Date;
    included?: string[];
    excluded?: string[];
    amenities?: string[];
    tourPlan?: string[];
    maxGuest?: number;
    minAge?: number;
    videoUrl?: string;
    deletedImages?: string[];
    division: IDivision;
    tourType: ITourType
}