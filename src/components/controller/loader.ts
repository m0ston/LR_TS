interface LoaderOptions {
    apiKey: string;
    [key: string]: string;
}

interface RequestParams {
    endpoint: string;
    options?: Record<string, string>;
}

type Callback<T> = (data: T) => void;

class Loader {

    baseLink: string;
    options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: RequestParams,
        callback: Callback<T>
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {

        if (!res.ok) {

            if (res.status === 401 || res.status === 404) {
                console.log(`Error ${res.status}: ${res.statusText}`);
            }

            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string>, endpoint: string): string {

        const urlOptions = { ...this.options, ...options };

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(
        method: string,
        endpoint: string,
        callback: Callback<T>,
        options: Record<string, string> = {}
    ): void {

        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;