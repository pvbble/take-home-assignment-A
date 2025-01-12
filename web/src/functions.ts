import { FormData, Query, ApiResponse, FormDataResponse } from "./types";

const API_BASE_URL = 'http://127.0.0.1:8080';


/**
 * Generic API request handler with error handling
 */
async function apiRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const url = `${API_BASE_URL}${endpoint}`;

        const requestOptions: RequestInit = {
            ...options
        };

        if (options.method !== 'DELETE') {
            requestOptions.headers = {
                'Content-Type': 'application/json',
                ...(options.headers as Record<string, string>)
            };
        }

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}

/**
 * Fetches all form data entries
 */
export async function getFormData(): Promise<ApiResponse<FormData[]>> {
    const response = await apiRequest<FormDataResponse>('/form-data');
    console.log(response);
    return {
        ...response,
        data: response.data?.data?.formData
    };
}

/**
 * Creates a new query
 */
export async function createQuery(
    title: string, 
    description: string, 
    formDataId: string
): Promise<ApiResponse<Query>> {
    return apiRequest<Query>('/query', {
        method: 'POST',
        body: JSON.stringify({ title, description, formDataId }),
    });
}

/**
 * Updates an existing query's status
 */
export async function updateQuery(
    id: string, 
    status: 'OPEN' | 'RESOLVED',
    description?: string
): Promise<ApiResponse<Query>> {
    return apiRequest<Query>(`/query/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            status,
            description: description || undefined,
        }),
    });
}

/**
 * Deletes a query by ID
 */
export async function deleteQuery(id: string): Promise<ApiResponse<void>> {
    return apiRequest<void>(`/query/${id}`, {
        method: 'DELETE',
    });
}