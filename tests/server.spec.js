const request = require('supertest')
const server = require('../index')

const id = Math.floor(Math.random() * 2543)
const coffee = { id, nombre: 'test coffee'}

describe('Operaciones CRUD de cafes', () => {
    test('[GET]/ cafes | Deberia retornar un status 200 y un Array con al menos 1 elemento', async () => {
        const response = await request(server).get('/cafes').send()
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(1)
    })

    test('[DELETE/ cafes/:id] | Deberia retornar un error 404 cuando el id no existe', async () => {
        const response = await request(server).delete('/cafes/fake_coffee').set('Authorization', 'fake_coffee').send()
        expect(response.status).toBe(404)
    })

    test('[POST/ cafes] | Deberia retornar un 201 cuando se crea un nuevo cafe', async () => {
        const response = await request(server).post('/cafes').send(coffee)
        expect(response.status).toBe(201)
        expect(response.body).toContainEqual(coffee)
    })

    test('[PUT/ cafes/:id] | Deberia retornar un status 400 al intentar actualizar un cafe, donde el params id que no corresponde al payload id', async () => {
        const response = await request(server).put('/cafes/fake_coffee_id').send(coffee)
        expect(response.status).toBe(400)
    })

    test('[use] /* | Deberia retornar un error 404 si la ruta no existe',  async () => {
        const response = await request(server).get('/fake_url').send()
        expect(response.statusCode).toBe(404)
    })
})
