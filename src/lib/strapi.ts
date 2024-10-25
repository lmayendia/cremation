const { BACKEND_URL, BACKEND_API_KEY } = process.env;
interface QueryUserOptions extends RequestInit {}

export async function query(url: string) {
    const res = await fetch(`${BACKEND_URL}/api/${url}`, {
        headers: {
            Authorization: `Bearer ${BACKEND_API_KEY}`,
        }
    });
    return await res.json();
}

interface QueryUserOptions extends RequestInit {}

export async function queryUser<T>(url: string, options?: QueryUserOptions): Promise<T> {
    const fullUrl = `${BACKEND_URL}/api/${url}`;
    const response = await fetch(fullUrl, options);
  
    if (!response.ok) {
      // Attempt to parse error response
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'An error occurred while fetching data.');
    }
  
    return (await response.json()) as T;
  }