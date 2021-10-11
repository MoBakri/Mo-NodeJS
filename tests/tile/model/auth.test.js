const { User } = require("../../../models/user");
const bcrypt = require("bcrypt");

describe("user", () => {
  it("should return your valid password", () => {
    const payload = {
      username: "mohamed ali",
      email: "mohamed@aol.com",
      password: "123456",
    };

    const user = new User(payload);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    user.password = bcrypt.hashSync(user.password, salt);
    const result = bcrypt.compareSync(payload.password, user.password);

    expect(result).toBeTruthy();
  });
});
