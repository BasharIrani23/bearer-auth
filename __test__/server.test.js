"use strict";

require("dotenv").config();

const { app } = require("../src/server");
const { DB } = require("../src/auth/models/index");
const supertest = require("supertest");
const mockServer = supertest(app);
const base64 = require("base-64");
const basicAuthMiddleWare = require("../src/auth/middleware/basicAuth");

beforeAll(async () => {
    await DB.sync();
});

afterAll(async () => {
    await DB.drop();
});

// Test endpoints
describe("Test the signin & signup endpoints", () => {
    it("POST to /signup should create a new user", async () => {
        const result = await mockServer
            .post("/signup")
            .send({
                userName: "bashar1",
                password: "1234",
            })
            .expect(201);

        expect(result.body).toHaveProperty("id");
        expect(result.body.userName).toBe("bashar1");
    });
});
