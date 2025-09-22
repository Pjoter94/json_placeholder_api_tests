import { Post, CreatePostRequest ,PutPostResponse, PatchPostResponse } from '../types/post';
import { Comment } from '../types/comment';
import { expect } from '@playwright/test';

export class Assertions {
  static validatePostStructure(post: Post): void {
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    
    expect(typeof post.userId).toBe('number');
    expect(typeof post.id).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
  }

  static validatePutResponse(putResponse: PutPostResponse): void {
    expect(putResponse).toHaveProperty('id');
    expect(putResponse).toHaveProperty('title');
    expect(putResponse).toHaveProperty('body');
    
    expect(typeof putResponse.id).toBe('number');
    expect(typeof putResponse.title).toBe('string');
    expect(typeof putResponse.body).toBe('string');
  }

  static validatePatchResponse(patchResponse: PatchPostResponse): void {
    expect(patchResponse).toHaveProperty('id');
    
    if (patchResponse.title !== undefined) {
      expect(typeof patchResponse.title).toBe('string');
    }
    
    if (patchResponse.body !== undefined) {
      expect(typeof patchResponse.body).toBe('string');
    }
  }

  static validateCommentStructure(comment: Comment): void {
    expect(comment).toHaveProperty('postId');
    expect(comment).toHaveProperty('id');
    expect(comment).toHaveProperty('name');
    expect(comment).toHaveProperty('email');
    expect(comment).toHaveProperty('body');
    
    expect(typeof comment.postId).toBe('number');
    expect(typeof comment.id).toBe('number');
    expect(typeof comment.name).toBe('string');
    expect(typeof comment.email).toBe('string');
    expect(typeof comment.body).toBe('string');
  }

  static validatePostCreation(createdPost: Post, expectedData: CreatePostRequest): void {
    this.validatePostStructure(createdPost);
    expect(createdPost.userId).toBe(expectedData.userId);
    expect(createdPost.title).toBe(expectedData.title);
    expect(createdPost.body).toBe(expectedData.body);
  }

  static validatePostUpdate(updatedPost: PutPostResponse, updates: Partial<Post>): void {
    this.validatePutResponse(updatedPost);
    
    expect(updatedPost.id).toBe(updates.id);
    
    if (updates.title) {
      expect(updatedPost.title).toBe(updates.title);
    }
    
    if (updates.body) {
      expect(updatedPost.body).toBe(updates.body);
    }
  }

  static validatePostPatch(patchedPost: PatchPostResponse, updates: Partial<Post>): void {
    this.validatePatchResponse(patchedPost);
    
    expect(patchedPost.id).toBe(updates.id);
    
    if (updates.title) {
      expect(patchedPost.title).toBe(updates.title);
    }
    
    if (updates.body) {
      expect(patchedPost.body).toBe(updates.body);
    }
  }
}