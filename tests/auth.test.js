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

test('User Registration', async () => {
    const result = await request
        .post('/auth/register')
        .send({
            email: 'test@email.com',
            password: 'test-password',
            username: 'test',
        })
        .expect(200)
})

test('Duplicate User', async () => {
    await request
        .post('/auth/register')
        .send({
            email: 'test@email.com',
            password: 'test-password',
            username: 'test',
        })
        .expect(200)

    await request
        .post('/auth/register')
        .send({
            email: 'test@email.com',
            password: 'test-password',
            username: 'test',
        })
        .expect(500)
})
