export interface Query {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'OPEN' | 'RESOLVED';
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
    data: {
        formData: FormData[];
        total: number;
    }
}