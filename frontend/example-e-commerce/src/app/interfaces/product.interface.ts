import { CategoryInterface } from "./category.interface";

export interface ProductInterface {
    id: string | number | null;
    createdAt: string | Date | null;
    updatedAt: string | Date | null;
    name: string | null;
    price: string | number | null;
    isActive: boolean;
    categories: CategoryInterface[];
}