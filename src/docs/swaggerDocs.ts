import { BlogDocs } from './blogDocs'
// import UserDocs from "./userDocs";
// import MessageDocs from "./messageDocs";

export const swaggerdocs = {
  openapi: '3.0.1',
  info: {
    title: 'My brand documentation',
    version: '1.0.0',
    description: 'This is an API for my blog application',
    contact: {
      name: 'HAGENIMANA Patrick',
      url: 'patix.netlify.com',
      email: 'patrickhag09@gmail.com',
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'apiKey',
        name: 'x-auth-token',
        in: 'header',
        description: 'Bearer token authorization',
      },
    },
  },
  tags: [
    {
      name: 'Blog',
      description: 'Blog Endpoints',
    },
  ],
  paths: {
    ...BlogDocs,
  },
}
