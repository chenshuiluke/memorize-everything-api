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

test('Note creation', async () => {
    await request
        .post('/auth/register')
        .send({
            email: 'test@email.com',
            password: 'test-password',
            username: 'test',
        })
        .expect(200)
    await request
        .post('/note')
        .send({
            content: 'test@email.com',
        })
        .expect(200)
})
