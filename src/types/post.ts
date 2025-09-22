export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreatePostRequest {
  userId: number;
  title: string;
  body: string;
}

export interface UpdatePostRequest {
  id: number;
  userId?: number;
  title?: string;
  body?: string;
}

export interface PutPostResponse {
  id: number;
  title: string;
  body: string;
}

export interface PatchPostResponse {
  id: number;
  title?: string;
  body?: string;
}