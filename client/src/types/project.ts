export interface Project {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    isFeatured: boolean;
    isNew: boolean;
    isPopular: boolean;
    isTrending: boolean;
}