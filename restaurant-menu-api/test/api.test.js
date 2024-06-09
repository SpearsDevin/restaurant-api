const request = require('supertest');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('../schema');
const resolvers = require('../resolvers');

let app;
let server;

beforeAll(async () => {
  app = express();
  server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
});

afterAll(async () => {
  await server.stop();
});

describe('GraphQL API', () => {
  it('fetches the menu', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: '{ menu { name items { name description price } } }',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.data.menu).toBeTruthy();
  });
});