const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.status(200).send('Hola Mundo!');
});

describe('GET /', () => {
  it('responds with Hola Mundo!', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hola Mundo!');
  });
});
