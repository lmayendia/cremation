const { BACKEND_URL, STRAPI_MASTER_KEY } = process.env;
interface QueryUserOptions extends RequestInit {}

export async function query(url: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/${url}`, {
      method: "GET",
        headers: {
            Authorization: `Bearer ${STRAPI_MASTER_KEY}`,
        }
    });
    return await res.json();
  } catch (error) {
    console.error("Response from strapi", error);
    return error;
  }
}

export async function queryUser<T>(url: string, options?: QueryUserOptions): Promise<T> {
    const fullUrl = `${BACKEND_URL}/api/${url}`;
    const response = await fetch(fullUrl, options);
    
    if (!response.ok) {
        // Attempt to parse error response
        const errorData = await response.json();
        throw new Error(errorData.statusText || 'An error occurred while fetching data.');
    }
    
    return (await response.json()) as T;
}

export async function strapiPostRequest<T>(url: string, body: object): Promise<T> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_MASTER_KEY}`,
      },
      body: JSON.stringify({ data: body })
    });
    if (!response.ok) {
      const errorData = await response.json();  // Log complete error response
      console.error('Full Strapi error data:', JSON.stringify(errorData, null, 2)); // Detailed error logging
      throw new Error(errorData.error?.message || 'Failed to save data to Strapi');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in postToStrapi:', error);
    throw error; // Rethrow error for calling function to handle
  }
}
