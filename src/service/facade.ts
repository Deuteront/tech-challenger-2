const BASE_URL = 'http://localhost:3000';

class ApiFacade {
  private async request<T, B>(
    url: string,
    method: string,
    token?: string,
    body?: B
  ): Promise<T> {
    const headers: Record<string, string> = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const isFormData = body instanceof FormData;
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      method,
      headers,
      body: isFormData
        ? (body as unknown as FormData)
        : body
          ? JSON.stringify(body)
          : undefined,
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Error: ${response.statusText}. Details: ${errorDetails}`
      );
    }

    return response.json();
  }

  get<T, B>(url: string, token?: string, body?: B): Promise<T> {
    const queryString = body
      ? '?' + new URLSearchParams(body as Record<string, string>).toString()
      : '';
    const fullUrl = BASE_URL + url + queryString;

    return this.request<T, undefined>(fullUrl, 'GET', token);
  }

  post<T, B>(url: string, body: B, token?: string): Promise<T> {
    return this.request<T, B>(BASE_URL + url, 'POST', token, body);
  }

  put<T, B>(url: string, body: B, token?: string): Promise<T> {
    return this.request<T, B>(BASE_URL + url, 'PUT', token, body);
  }

  delete<T>(url: string, token?: string): Promise<T> {
    return this.request<T, undefined>(BASE_URL + url, 'DELETE', token);
  }

  async download(url: string, token?: string): Promise<void> {
    const headers: Record<string, string> = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(BASE_URL + url, { headers });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Error: ${response.statusText}. Details: ${errorDetails}`
      );
    }

    const blob = await response.blob();
    const contentDisposition = response.headers.get('Content-Disposition');
    let fileName = 'downloaded-file'; // Default file name

    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
      const matches = /filename="([^"]*)"/.exec(contentDisposition);
      if (matches != null && matches[1]) {
        fileName = matches[1];
      }
    }

    const fileURL = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(fileURL);
  }
}

export const service = new ApiFacade();
