const supertest = require('supertest')
let server
let request

beforeAll(async () => {
    server = require('../app')
    server = await server.listen(process.env.API_PORT)
    request = supertest.agent(server)
})

beforeEach(async () => {
    await require('./utils').clearTestDb()
    await request
        .post('/auth/register')
        .send({
            email: 'test@email.com',
            password: 'test-password',
            username: 'test',
        })
        .expect(200)

    await request
        .post('/auth/login')
        .send({
            email: 'test@email.com',
            password: 'test-password',
        })
        .expect(200)
})

afterAll(async () => {
    server.close()
    await require('./utils').clearTestDb()
})

test('Should create note successfully', async () => {
    await request
        .post('/note')
        .send({
            content: 'content',
            title: 'title',
        })
        .expect(200)
})

test('Should fail to create note if title is missing', async () => {
    const response = await request
        .post('/note')
        .send({
            content: 'content',
        })
        .expect(400)
    expect(response.body.message).toBe('Note title is a required field')
})
