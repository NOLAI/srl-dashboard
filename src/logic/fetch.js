const activeRequests = new Map();

export const fetch = (endpoint) => {
    if (activeRequests.has(endpoint)) {
        return activeRequests.get(endpoint);
    }
    const request = new Promise((resolve, reject) => {
        window.fetch(import.meta.env.VITE_API_URL + endpoint).then(async response => {
            if (response.ok) {
                const body = await response.json();
                resolve(body);
            } else {
                const body = await response.json();
                reject({body, status: response.status});
            }
        }).finally(() => {
            activeRequests.delete(endpoint);
        });
    });
    activeRequests.set(endpoint, request);
    return request;
}