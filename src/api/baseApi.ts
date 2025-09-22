import { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class BaseApi {
  protected constructor(protected request: APIRequestContext) {}

  protected async get(endpoint: string): Promise<APIResponse> {
    return this.request.get(endpoint);
  }

  protected async post(endpoint: string, data: any): Promise<APIResponse> {
    return this.request.post(endpoint, { data });
  }

  protected async put(endpoint: string, data: any): Promise<APIResponse> {
    return this.request.put(endpoint, { data });
  }

  protected async patch(endpoint: string, data: any): Promise<APIResponse> {
    return this.request.patch(endpoint, { data });
  }

  protected async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(endpoint);
  }

  protected async validateResponse(response: APIResponse, expectedStatus: number = 200): Promise<void> {
    if (response.status() !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus}, but got ${response.status()}. Response: ${await response.text()}`);
    }
  }
}