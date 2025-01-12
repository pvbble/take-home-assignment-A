export enum QueryStatus {
    OPEN = 'OPEN',
    RESOLVED = 'RESOLVED'
}

export interface Query {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    status: QueryStatus;
    formDataId: string;
}

export interface FormData {
    id: string;
    question: string;
    answer: string;
    query?: Query;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface FormDataResponse {
    formData: FormData[];
    total: number;
}