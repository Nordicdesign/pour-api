import request from 'supertest'
import { app } from '../app'
import { Users } from '../database/models/users'
// import { newToken } from '../utils/auth'

describe('API Authentication:', () => {
  let token
  beforeEach(async () => {
    const user = await Users.create({ email: 'a@a.com', password: 'hello' })
    // token = newToken(user)
  })

  describe('api auth', () => {
    test('api should be locked down', async () => {
      let response = await request(app).get('/api/item')
      expect(response.statusCode).toBe(401)

      response = await request(app).get('/api/list')
      expect(response.statusCode).toBe(401)

      response = await request(app).get('/api/user')
      expect(response.statusCode).toBe(401)
    })

    // test('passes with JWT', async () => {
    //   const jwt = `Bearer ${token}`
    //   const id = mongoose.Types.ObjectId()
    //   const results = await Promise.all([
    //     request(app).get('/api/item').set('Authorization', jwt),
    //     request(app).get(`/api/item/${id}`).set('Authorization', jwt),
    //     request(app).post('/api/item').set('Authorization', jwt),
    //     request(app).put(`/api/item/${id}`).set('Authorization', jwt),
    //     request(app).delete(`/api/item/${id}`).set('Authorization', jwt),
    //   ])

    //   results.forEach((res) => expect(res.statusCode).not.toBe(401))
    // })
  })
})
