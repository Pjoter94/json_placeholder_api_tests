import { test, expect } from '@playwright/test';
import { CommentsApi } from '../src/api/commentsApi';
import { Assertions } from '../src/utils/assertions';

test.describe('Comments API Tests', () => {
  let commentsApi: CommentsApi;

  test.beforeEach(async ({ request }) => {
    commentsApi = new CommentsApi(request);
  });

  test('GET /comments - should return all comments', async () => {
    // Arrange
    const expectedMinCommentsCount = 1;

    // Act
    const comments = await commentsApi.getAllComments();
    
    // Assert
    expect(comments).toBeInstanceOf(Array);
    expect(comments.length).toBeGreaterThanOrEqual(expectedMinCommentsCount);
    
    comments.forEach(comment => {
      Assertions.validateCommentStructure(comment);
    });
  });

  test('GET /comments/{id} - should return a specific comment', async () => {
    // Arrange
    const commentId = 1;

    // Act
    const comment = await commentsApi.getCommentById(commentId);
    
    // Assert
    Assertions.validateCommentStructure(comment);
    expect(comment.id).toBe(commentId);
  });

  test('GET /comments?postId={postId} - should return comments by post ID', async () => {
    // Arrange
    const postId = 1;
    const expectedMinCommentsCount = 1;

    // Act
    const comments = await commentsApi.getCommentsByPostId(postId);
    
    // Assert
    expect(comments).toBeInstanceOf(Array);
    expect(comments.length).toBeGreaterThanOrEqual(expectedMinCommentsCount);
    
    comments.forEach(comment => {
      Assertions.validateCommentStructure(comment);
      expect(comment.postId).toBe(postId);
    });
  });

  test('GET /comments?email={email} - should return comments by email', async () => {
    // Arrange
    const email = 'Eliseo@gardner.biz';
    const expectedMinCommentsCount = 1;

    // Act
    const comments = await commentsApi.getCommentsByEmail(email);
    
    // Assert
    expect(comments).toBeInstanceOf(Array);
    expect(comments.length).toBeGreaterThanOrEqual(expectedMinCommentsCount);
    
    comments.forEach(comment => {
      Assertions.validateCommentStructure(comment);
      expect(comment.email).toBe(email);
    });
  });

  test('GET /comments/{id} - should handle non-existent comment', async () => {
    // Arrange
    const nonExistentId = 9999;

    // Act & Assert
    await expect(commentsApi.getCommentById(nonExistentId)).rejects.toThrow();
  });

  test('GET /comments - should return comments with correct data structure', async () => {
    // Arrange
    const expectedProperties = ['postId', 'id', 'name', 'email', 'body'];

    // Act
    const comments = await commentsApi.getAllComments();
    
    // Assert
    expect(comments.length).toBeGreaterThan(0);
    
    comments.forEach(comment => {
      expectedProperties.forEach(property => {
        expect(comment).toHaveProperty(property);
      });
      
      expect(typeof comment.postId).toBe('number');
      expect(typeof comment.id).toBe('number');
      expect(typeof comment.name).toBe('string');
      expect(typeof comment.email).toBe('string');
      expect(typeof comment.body).toBe('string');
    });
  });

  test('GET /comments?postId={postId} - should return only comments for specified post', async () => {
    // Arrange
    const postId = 1;
    const differentPostId = 2;

    // Act
    const comments = await commentsApi.getCommentsByPostId(postId);
    
    // Assert
    expect(comments.length).toBeGreaterThan(0);
    
    comments.forEach(comment => {
      Assertions.validateCommentStructure(comment);
      expect(comment.postId).toBe(postId);
      expect(comment.postId).not.toBe(differentPostId);
    });
  });

  test('GET /comments?email={email} - should return only comments with specified email', async () => {
    // Arrange
    const email = 'Eliseo@gardner.biz';
    const differentEmail = 'Jayne_Kuhic@sydney.com';

    // Act
    const comments = await commentsApi.getCommentsByEmail(email);
    
    // Assert
    expect(comments.length).toBeGreaterThan(0);
    
    comments.forEach(comment => {
      Assertions.validateCommentStructure(comment);
      expect(comment.email).toBe(email);
      expect(comment.email).not.toBe(differentEmail);
    });
  });
});