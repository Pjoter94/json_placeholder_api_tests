import { BaseApi } from './baseApi';
import { Comment } from '../types/comment';
import { APIRequestContext } from '@playwright/test';

export class CommentsApi extends BaseApi {
  private readonly endpoint = '/comments';

  constructor(request: APIRequestContext) {
    super(request);
  }

  async getAllComments(): Promise<Comment[]> {
    const response = await this.get(this.endpoint);
    await this.validateResponse(response);
    return response.json();
  }

  async getCommentById(id: number): Promise<Comment> {
    const response = await this.get(`${this.endpoint}/${id}`);
    await this.validateResponse(response);
    return response.json();
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    const response = await this.get(`${this.endpoint}?postId=${postId}`);
    await this.validateResponse(response);
    return response.json();
  }

  async getCommentsByEmail(email: string): Promise<Comment[]> {
    const response = await this.get(`${this.endpoint}?email=${email}`);
    await this.validateResponse(response);
    return response.json();
  }
}