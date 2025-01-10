

export const getFormData = async (): Promise<any> => {
    const response = await fetch('http://127.0.0.1:8080/form-data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(await response.json());
    return;
}


export const getQuery = async (): Promise<any> => {
    const response = await fetch('http://127.0.0.1:8080/query', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(await response.json());
    return;
}

export const postQuery = async (title: string, description: string, formDataId: string): Promise<Boolean> => {
    const response = await fetch('http://127.0.0.1:8080/query', {
        method: "POST",
        body: JSON.stringify({title, description, formDataId}),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    console.log(response.ok);
    return response.ok
}