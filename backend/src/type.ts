export interface ProductInterface {
    id: string;
    name: string;
    category: string;
    image: string;
    isPopular: boolean;
    latest: boolean;
    material: string;
    moq: string;
    size: string;
    createdAt: Date;
    lastUpdatedAt: Date;
    details: string;
    userId: string;
    reviews: ReviewInterface[];
    requirements: RequirementInterface[];
}

export interface DetailsInterface {
    id: string;
    color?: string;
    finish?: string;
    pattern?: string;
    shape?: string;
    weight?: string;
    height?: string;
    width?: string;
    productId: string;
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