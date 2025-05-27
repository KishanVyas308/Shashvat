export interface ProductInterface {
    id: string;
    image: string;
    name: string;
    moq: string;
    category: string;
    subCategory?: string;
    size: string;
    material?: string;
    shape?: string;
    color?: string;
    pattern?: string;
    finish?: string;
    weight?: string;
    
    isPopular: string;
    latest: string;
    createdAt: Date;
    lastUpdatedAt: Date;
    userId: string;
}



export interface ReviewInterface {
    id: string;
    companyName: string;
    description: string;
    name: string;
    img: string;
    rating: number;
    createdAt: Date;
    userId: string;
    productId: string;
}

export interface RequirementInterface {
    id: string;
    isViewed: boolean;
    category: string;
    createdAt: Date;
    color?: string;
    finish?: string;
    pattern?: string;
    shape?: string;
    img: string;
    isPopular: boolean;
    lastUpdatedAt: Date;
    latest: boolean;
    material: string;
    moq: string;
    name: string;
    size: string;
    specificDetail: string;
    userId: string;
    productId: string;
}