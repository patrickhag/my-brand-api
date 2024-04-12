import request from 'supertest'
import { app } from '..'
import { userModel as User } from '../models/user.model'

describe('User Registration', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  it('should register a new user with all required fields provided', async () => {
    const response = await request(app).post('/api/register/').send({
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: '@123Password',
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('status', 'ok')
  }, 10000)

  it('should return an error when attempting to register a user with an existing email', async () => {
    await User.create({
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: '@123Password',
    })

    const response = await request(app).post('/api/register/').send({
      fullName: 'John Smith',
      email: 'john.doe@example.com',
      password: '@123Password',
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'Bad request')
    expect(response.body).toHaveProperty('message', 'Email is already taken')
  })

  it('should return an error when attempting to register a user with missing required fields', async () => {
    const response = await request(app).post('/api/register/').send({
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      // Missing password field
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'Bad request')
    expect(response.body).toHaveProperty('message', 'Missing Field(s)')
  })
})
