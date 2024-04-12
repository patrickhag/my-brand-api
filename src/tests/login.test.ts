import request from 'supertest'
import { app } from '..'
import { userModel as User } from '../models/user.model'

describe('User Login', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  it('should login a user with correct credentials', async () => {
    await User.create({
      fullName: 'Patrick Doe',
      email: 'patix.doe@example.com',
      password: '@123Patix',
    })

    const response = await request(app).post('/api/login/').send({
      email: 'patix.doe@example.com',
      password: '@123Patix',
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('message', 'Logged in successfully')
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('userFound')
  })

  it('should return an error when attempting to login with incorrect credentials', async () => {
    await User.create({
      fullName: 'Patrick Doe',
      email: 'patrick.doe@example.com',
      password: '@123Password',
      role: 'user',
    })

    const response = await request(app).post('/api/login/').send({
      email: 'patrick.doe@example.com',
      password: 'incorrect-password',
    })
    expect(response.status).toBe(403)
    expect(response.body).toHaveProperty('status', 'Forbidden')
    expect(response.body).toHaveProperty('message', 'Incorrect credentials')
  })
})
