import MockAdapter from "axios-mock-adapter";

const mockUsers = (mock: MockAdapter) => {
  mock.onGet("/api/users").reply(() => [
    200,
    [
      {
        _id: 1,
        email: "1@gmail.com",
        password: "pass",
        profilePicturePath: "./",
      },
      {
        _id: 2,
        email: "2@gmail.com",
        password: "pass",
        profilePicturePath: "./",
      },
    ],
  ]);
};

export { mockUsers };
