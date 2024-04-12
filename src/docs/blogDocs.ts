const listBlogs = {
  tags: ['Blog'],
  description: 'Return a list of all blogs in the database',
  responses: {
    200: {
      description: 'Successful operation',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              count: { type: 'integer' },
              blogs: { type: 'array', items: { type: 'string' } },
            },
            example: {
              count: 0,
              blogs: [],
            },
          },
        },
      },
    },
  },
}

const getOneBlog = {
  tags: ['Blog'],
  description: 'Return a blog with a given ID',
  responses: {
    200: {
      description: 'Successful operation',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              count: { type: 'integer' },
              blogs: { type: 'array', items: { type: 'string' } },
            },
            example: {
              count: 0,
              blogs: [],
            },
          },
        },
      },
    },
  },
}

const createBlog = {
  tags: ['Blog'],
  description: 'Create a new blog post',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              minLength: 2,
              maxLength: 255,
            },
            summary: {
              type: 'string',
              minLength: 2,
              maxLength: 1024 * 10,
            },
            body: {
              type: 'string',
              minLength: 2,
              maxLength: 1024 * 10,
            },
            likes: {
              type: 'array',
              items: { type: 'string' },
              description: 'An array of user IDs who liked the blog post',
            },
            comments: {
              type: 'array',
              items: { type: 'string' },
              description: 'An array of comments on the blog post',
            },
            thumbnail: {
              type: 'string',
              description: 'URL of the thumbnail image for the blog post',
            },
          },
          required: ['title', 'summary', 'body'],
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'Blog post created successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '1234567890abcdef',
              },
              title: {
                type: 'string',
                example: 'Blog Post Title',
              },
              summary: {
                type: 'string',
                example: 'Blog Post Content',
              },
              likes: {
                type: 'array',
                items: { type: 'string' },
                example: ['user1', 'user2'], // Assuming user IDs
              },
              comments: {
                type: 'array',
                items: { type: 'string' },
                example: ['comment1', 'comment2'], // Assuming comment IDs
              },
              thumbnail: {
                type: 'string',
                example: 'https://example.com/thumbnail.jpg',
              },
            },
          },
        },
      },
    },
  },
}

export const BlogDocs = {
  '/api/blog': {
    get: {
      summary: 'Get a list of all blogs',
      ...listBlogs,
    },
  },
  '/api/blog/create-blog': {
    get: {
      summary: 'Create new blog',
      ...createBlog,
    },
  },
  '/api/blog/65f86e8db2bc823b0f7945d2': {
    get: {
      summary: 'Get a single blog post by ID',
      ...getOneBlog,
    },
  },
}
