import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .post("/api/v1/todos")
    .set("Cookie", cookie)
    .send({
      title: "foo",
      description: "bar",
    })
    .expect(201);

  expect(response.body.title).toEqual("foo");
  expect(response.body.description).toEqual("bar");
});
