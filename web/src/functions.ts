import { FormData } from "./types";

export const getFormData = async (): Promise<FormData[]> => {
    const response = await fetch('http://127.0.0.1:8080/form-data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json();

    return json.data.formData;
}

export const postQuery = async (title: string, description: string, formDataId: string): Promise<boolean> => {
    const response = await fetch('http://127.0.0.1:8080/query', {
        method: "POST",
        body: JSON.stringify({title, description, formDataId}),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return response.ok
}

export const updateQuery = async (id: string, isOpen: boolean): Promise<boolean> => {
    const url = `http://127.0.0.1:8080/query/${id}`;
    
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            status: isOpen ? 'RESOLVED' : 'OPEN',
            description: ''
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.ok;
}

export const deleteQuery = async (id: string): Promise<boolean> => {
    const url = `http://127.0.0.1:8080/query/${id}`;
    
    try {
        console.log('Attempting to delete query with ID:', id);
        const response = await fetch(url, {
            method: 'DELETE',
        });

        console.log('Delete response status:', response.status);
        console.log('Delete response ok:', response.ok);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('Error response:', errorText);
            throw new Error(`Failed to delete query: ${errorText}`);
        }

        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error in deleteQuery:', error);
        return false;
    }
};
