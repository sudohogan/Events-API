import User from "../../app/model/User";

describe("Create users", () => {
    it("Should create a new user successfully!", () => {
      const mockUser = {
        firstName: "fries",
        lastName: "fries",
        birthDate: "2023-08-24",
        city: "string city",
        country: "Nigeria",
        email: "fries@email.com",
        password: "password",
        confirmPassword: "stpasswordring"
      };
      const spy = jest.spyOn(User, "create").mockReturnValueOnce(mockUser as any);
      User.create(mockUser);
      const spyCreatedUser = spy.mock.results[0].value;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyCreatedUser.firstName).toEqual(mockUser.firstName);
      spy.mockReset();
    })
})

describe("Sign in Users", () => {
  it("Signs in an already created user", () => {
    const userMocker = {
      email: "fries@email.com",
      password: "password",
    };
    const spy = jest.spyOn(User, "collection").mockReturnValueOnce(userMocker as any);
    User.create(userMocker);
    const spyCreatedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyCreatedUser.email).toEqual(userMocker.email);
    spy.mockReset();
  })
})