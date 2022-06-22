const supertest = require('supertest')
let server
let request
beforeAll(() => {
    server = require('../app')
    server = server.listen(process.env.API_PORT)
    request = supertest(server)
})

afterAll(() => {
    server.close()
})

test('Healthcheck', async () => {
    const result = await request.get('/health-check')
    expect(result.status).toBe(200)
})
