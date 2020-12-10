export async function handleResponse(response){
    if(response.ok) return response.json();
    if(response.status  === 400){
        const error = await response.text();
        throw new Error(error)
    }
    throw new Error("Network response was not ok.")
}

// in real app, would likely call an error lodging service
export function handleError(error) {
    // eslint-disable-next-line no-console
    console.error("API call failed." + error);
    throw error;
}