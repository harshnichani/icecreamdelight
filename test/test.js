const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const { expect } = chai;

chai.use(chaiHttp);

// describe is used to group individual tests.
// The first parameter should indicate what we’re testing — in this case, Register & Login Routes
// it is used to create the actual tests. The first parameter to it should provide a human-readable description of the test.

describe("Register Tests", function () {
    it("Register get request", function () {
        chai.request(app)
            .get("/signup")
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    assert.equal(res.status, 200, "Response was not ok");
                    return;
                }
            });
    });
    it("Register post request", function () {
        chai.request(app)
            .post("/signup")
            .send({ email: "test1@googlemail.com", password: "test1234" })
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    assert.equal(res.status, 200, "Response was not ok");
                    assert.equal(res.type, "application/json");
                    expect(res.body).to.have.property("userCreated");
                    console.log(res.body);
                    return;
                }
            });
    });
});

describe("Login Tests", function () {
    it("Login get request", function () {
        chai.request(app)
            .get("/login")
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    assert.equal(res.status, 200, "Response was not ok");
                    return;
                }
            });
    });
    it("Login post request", function () {
        chai.request(app)
            .post("/login")
            .send({ email: "test@googlemail.com", password: "test1234" })
            .end(function (err, res) {
                if (err) {
                    console.log(err);
                } else {
                    assert.equal(res.status, 200, "Response was not ok");
                    assert.equal(res.type, "application/json");
                    expect(res.body).to.have.property("user");
                    console.log(res.body);
                    return;
                }
            });
    });
});
