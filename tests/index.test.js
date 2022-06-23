const supertest = require('supertest')
let server
let request
beforeAll(async () => {
    server = require('../app')
    server = await server.listen(process.env.API_PORT)
    request = supertest(server)
})

afterAll(async () => {
    server.close()
})

test('Healthcheck', async () => {
    const result = await request.get('/health-check')
    expect(result.status).toBe(200)
})
