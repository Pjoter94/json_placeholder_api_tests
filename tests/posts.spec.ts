import { test, expect } from '@playwright/test';
import { PostsApi } from '../src/api/postsApi';
import { TestData } from '../src/utils/testData';
import { Assertions } from '../src/utils/assertions';

test.describe('Posts API Tests', () => {
  let postsApi: PostsApi;

  test.beforeEach(async ({ request }) => {
    postsApi = new PostsApi(request);
  });

  test('GET /posts - should return all posts', async () => {
    // Arrange
    const expectedMinPostsCount = 1;

    // Act
    const posts = await postsApi.getAllPosts();
    
    // Assert
    expect(posts).toBeInstanceOf(Array);
    expect(posts.length).toBeGreaterThanOrEqual(expectedMinPostsCount);
    
    posts.forEach(post => {
      Assertions.validatePostStructure(post);
    });
  });

  test('GET /posts/{id} - should return a specific post', async () => {
    // Arrange
    const postId = 1;

    // Act
    const post = await postsApi.getPostById(postId);
    
    // Assert
    Assertions.validatePostStructure(post);
    expect(post.id).toBe(postId);
  });

  test('GET /posts?userId={userId} - should return posts by user ID', async () => {
    // Arrange
    const userId = 1;
    const expectedMinPostsCount = 1;

    // Act
    const posts = await postsApi.getPostsByUserId(userId);
    
    // Assert
    expect(posts).toBeInstanceOf(Array);
    expect(posts.length).toBeGreaterThanOrEqual(expectedMinPostsCount);
    
    posts.forEach(post => {
      Assertions.validatePostStructure(post);
      expect(post.userId).toBe(userId);
    });
  });

  test('POST /posts - should create a new post', async () => {
    // Arrange
    const postData = TestData.posts.validPost();

    // Act
    const createdPost = await postsApi.createPost(postData);
    
    // Assert
    Assertions.validatePostCreation(createdPost, postData);
    expect(createdPost.id).toBeDefined();
  });

  test('PUT /posts/{id} - should update an existing post', async () => {
    // Arrange
    const postId = 1;
    const updateData = TestData.posts.updatePost(postId);

    // Act
    const updatedPost = await postsApi.updatePost({ ...updateData, id: postId });
    
    // Assert
    Assertions.validatePostUpdate(updatedPost, updateData);
  });

  test('PATCH /posts/{id} - should partially update a post', async () => {
    // Arrange
    const postId = 1;
    const patchData = TestData.posts.patchData;

    // Act
    const patchedPost = await postsApi.patchPost(postId, patchData);
    
    // Assert
    Assertions.validatePostPatch(patchedPost, { id: postId, ...patchData });
  });

  test('DELETE /posts/{id} - should delete a post', async () => {
    // Arrange
    const postId = 1;

    // Act & Assert
    await expect(postsApi.deletePost(postId)).resolves.not.toThrow();
  });

  test('GET /posts/{id} - should handle non-existent post', async () => {
    // Arrange
    const nonExistentId = 9999;

    // Act & Assert
    await expect(postsApi.getPostById(nonExistentId)).rejects.toThrow();
  });

  test('GET /posts - should return posts with correct data structure', async () => {
    // Arrange
    const expectedProperties = ['userId', 'id', 'title', 'body'];

    // Act
    const posts = await postsApi.getAllPosts();
    
    // Assert
    expect(posts.length).toBeGreaterThan(0);
    
    posts.forEach(post => {
      expectedProperties.forEach(property => {
        expect(post).toHaveProperty(property);
      });
      
      expect(typeof post.userId).toBe('number');
      expect(typeof post.id).toBe('number');
      expect(typeof post.title).toBe('string');
      expect(typeof post.body).toBe('string');
    });
  });

  test('POST /posts - should create post with correct data', async () => {
    // Arrange
    const postData = TestData.posts.validPost(5);
    const expectedTitle = 'Test Post Title';
    const expectedBody = 'This is a test post body content for API testing purposes.';

    // Act
    const createdPost = await postsApi.createPost(postData);
    
    // Assert
    expect(createdPost.userId).toBe(5);
    expect(createdPost.title).toBe(expectedTitle);
    expect(createdPost.body).toBe(expectedBody);
    expect(createdPost.id).toBeDefined();
  });
});