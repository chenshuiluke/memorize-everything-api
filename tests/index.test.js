const supertest = require('supertest')
let server
let request
beforeAll(async () => {
    server = require('../app')
    server = await server.listen(process.env.API_PORT)
    request = supertest(server)
})

beforeEach(async () => {
    await require('./utils').clearTestDb()
})

afterAll(async () => {
    server.close()
    await require('./utils').clearTestDb()
})

test('Healthcheck', async () => {
    const result = await request.get('/health-check')
    expect(result.status).toBe(200)
})
