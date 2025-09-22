import { BaseApi } from './baseApi';
import { Post, CreatePostRequest, UpdatePostRequest, PatchPostResponse, PutPostResponse } from '../types/post';
import { APIRequestContext } from '@playwright/test';

export class PostsApi extends BaseApi {
  private readonly endpoint = '/posts';

  constructor(request: APIRequestContext) {
    super(request);
  }

  async getAllPosts(): Promise<Post[]> {
    const response = await this.get(this.endpoint);
    await this.validateResponse(response);
    return response.json();
  }

  async getPostById(id: number): Promise<Post> {
    const response = await this.get(`${this.endpoint}/${id}`);
    await this.validateResponse(response);
    return response.json();
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    const response = await this.get(`${this.endpoint}?userId=${userId}`);
    await this.validateResponse(response);
    return response.json();
  }

  async createPost(postData: CreatePostRequest): Promise<Post> {
    const response = await this.post(this.endpoint, postData);
    await this.validateResponse(response, 201);
    return response.json();
  }

  async updatePost(postData: UpdatePostRequest): Promise<PutPostResponse> {
    const response = await this.put(`${this.endpoint}/${postData.id}`, postData);
    await this.validateResponse(response);
    return response.json();
  }

  async patchPost(id: number, updates: Partial<Post>): Promise<PatchPostResponse> {
    const response = await this.patch(`${this.endpoint}/${id}`, updates);
    await this.validateResponse(response);
    return response.json();
  }

  async deletePost(id: number): Promise<void> {
    const response = await this.delete(`${this.endpoint}/${id}`);
    await this.validateResponse(response, 200);
  }
}