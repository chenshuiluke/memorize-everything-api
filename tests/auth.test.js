const supertest = require('supertest')
let server
let request
jest.setTimeout(10000)
beforeAll(() => {
    server = require('../app')
    server = server.listen(process.env.API_PORT)
    request = supertest(server)
})

afterAll(() => {
    server.close()
})

test('User Registration', async () => {
    const result = await request.post('/auth/register').send({
        email: 'test@email.com',
        password: 'test-password',
        username: 'test',
    })
    expect(result.status).toBe(200)
})
