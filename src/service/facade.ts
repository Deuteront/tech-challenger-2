const BASE_URL = 'http://localhost:3000';

class ApiFacade {
  private async request<T, B>(
    url: string,
    method: string,
    token?: string,
    body?: B
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  }

  get<T>(url: string, token?: string): Promise<T> {
    return this.request<T, undefined>(BASE_URL + url, 'GET', token);
  }

  post<T, B>(url: string, body: B, token?: string): Promise<T> {
    return this.request<T, B>(BASE_URL + url, 'POST', token, body);
  }
}

export const service = new ApiFacade();
