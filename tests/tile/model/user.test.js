const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("user.genAuthToken", () => {
  it("should return valid jwt", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.genAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject(payload);
    console.log(payload);
  });
});
