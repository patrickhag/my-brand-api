import request from 'Supertest'
import { app } from '..'
import { generateAuthToken } from '../helper/generate-auth-token'
import { userModel as User } from '../models/user.model'

describe('Blog controller', () => {
  let token: string
  beforeEach(async () => {
    await User.deleteMany({})
  })

  it('should return status code 201 if new blog is created successfully', async () => {
    const user = new User({
      fullName: 'Peter pan',
      email: 'patix@gmail.com',
      password: 'patix@123',
      role: 'admin',
    })
    token = generateAuthToken(user._id, user.role, user.fullName)
    await User.create(user)

    const res = await request(app)
      .post('/api/blog/create-blog')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Blog',
        summary:
          'lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit ',
        body: 'This is a test blog lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit lorem ipsum dolor sit ',
      })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('status', 'success')
    expect(res.body.Message).toBe('Article successfully created!')
  })

  it('should return status code 400 if request body is invalid', async () => {
    const res = await request(app)
      .post('/api/blog/create-blog')
      .set('Authorization', `Bearer ${process.env.AUTH_TOKEN!}`)
      .send({
        title: 'lorem ipsum dolor sit lorem ipsum',
      })

    expect(res.status).toBe(400)
    expect(res.body.status).toBe('Bad Request')
  })
})
