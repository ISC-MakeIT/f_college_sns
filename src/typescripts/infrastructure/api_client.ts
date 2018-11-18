export class ApiClient {
    public static async get(path: string) {
        return await this.call(path, 'GET');
    }

    public static async patch(path: string, body?: object) {
        return await this.call(path, 'PATCH', body);
    }

    public static async post(path: string, body?: object) {
        return await this.call(path, 'POST', body);
    }

    public static async delete(path: string) {
        await this.call(path, 'DELETE');
        return null;
    }

    private static async call(path: string, method: string, body?: object) {
        const res = await fetch(this.requestUrl(path), {
            headers: { 'Content-Type': 'application/json' },
            method,
            credentials: 'include',
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (res.status !== 200) throw new Error(data.result);
        return data;
    }

    private static requestUrl = (path: string) => {
        if (window.location.origin === 'https://fc-fb-live.com') {
            return 'https://fc-fb-live.com/api' + path;
        }
        return 'http://localhost:3000/api' + path;
    }

}

// How to use
// public static async send(product: Product, text: string) {
//     await ApiClient.post(`/apis/products/${product.id}/comments`, {
//         text,
//     });
// }
// public static async delete(product: Product) {
//     await ApiClient.delete('/apis/products/' + product.id);
// }
