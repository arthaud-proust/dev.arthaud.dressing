export type ClothingCategory = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ClothingDto = {
    id: number;
    category: ClothingCategory;
    description: string;
    imageUrls: Array<any>;
};
export type DressingDto = {
    id: number;
    name: string;
};
export type UserDto = {
    email: string;
};