import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";


describe('/users', () => {

  it('should return 200 and empty array', async () => {
    await request(app)
      .get('/api/users')
      .expect(200, [])
  })

  it('should create a user and return it', async () => {
    const createdUser = await request(app)
      .post('/api/users')
      .send({ name: "Mikita" })
      .expect(200)

    expect(createdUser.body).toEqual({
      "data": {
             "_id": expect.any(String),
              "name": "Mikita",
              "posts": [],
           },
      "message": "User successfully added"
    })
  })

})