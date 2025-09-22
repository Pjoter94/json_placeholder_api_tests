import { CreatePostRequest, Post } from '../types/post';
import { Comment } from '../types/comment';

export const TestData = {
  posts: {
    validPost: (userId: number = 1): CreatePostRequest => ({
      userId,
      title: 'Test Post Title',
      body: 'This is a test post body content for API testing purposes.'
    }),

    updatePost: (id: number): Partial<Post> => ({
      id,
      title: 'Updated Post Title',
      body: 'Updated post body content.'
    }),

    patchData: {
      title: 'Patched Post Title',
      body: 'Patched post body content.'
    },

    postWithLongTitle: (userId: number = 1): CreatePostRequest => ({
      userId,
      title: 'This is a very long post title that exceeds the normal length limit for testing purposes',
      body: 'Test body content.'
    }),

    postWithSpecialCharacters: (userId: number = 1): CreatePostRequest => ({
      userId,
      title: 'Post with spéciål chàräctérs',
      body: 'Body with spéciål chàräctérs and symbols: !@#$%^&*()'
    })
  },

  comments: {
    validComment: (postId: number = 1): Partial<Comment> => ({
      postId,
      name: 'Test Comment',
      email: 'test@example.com',
      body: 'This is a test comment body.'
    }),

    commentWithLongName: (postId: number = 1): Partial<Comment> => ({
      postId,
      name: 'Very long comment name that exceeds normal limits for testing purposes',
      email: 'long.name@example.com',
      body: 'Test body content.'
    }),

    commentWithSpecialCharacters: (postId: number = 1): Partial<Comment> => ({
      postId,
      name: 'Comment with spéciål chàräctérs',
      email: 'special@example.com',
      body: 'Body with spéciål chàräctérs and symbols: !@#$%^&*()'
    })
  }
};