import MockAdapter from "axios-mock-adapter";

const mockUsers = (mock: MockAdapter) => {
  mock.onGet("/api/users").reply(() => [
    200,
    [
      {
        _id: 1,
        email: "1@gmail.com",
        password: "pass",
        username: "user1",
        profileImage: "./",
      },
      {
        _id: 2,
        email: "2@gmail.com",
        password: "pass",
        username: "user2",
        profileImage: "./",
      },
    ],
  ]);

  mock.onPatch(/\/api\/users\.*/).reply(() => [200, {}]);
};

export { mockUsers };
