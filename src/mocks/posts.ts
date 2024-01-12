import MockAdapter from "axios-mock-adapter";

const mockPosts = (mock: MockAdapter) => {
  mock.onPost("/api/posts").reply(() => [200]);

  mock.onGet("/api/posts").reply(() => [
    200,
    [
      {
        _id: 1,
        owner: {
          _id: 1,
          email: "1@gmail.com",
          password: "pass",
          profilePicturePath: "./",
        },
        title: "title1",
        content: "text text\n more text\n bla bla bla",
        imagePath: "./",
        comments: [
          {
            _id: 1,
            owner: {
              _id: 2,
              email: "2@gmail.com",
              password: "pass",
              profilePicturePath: "./",
            },
            content: "comment1",
          },
          {
            _id: 1,
            owner: {
              _id: 2,
              email: "2@gmail.com",
              password: "pass",
              profilePicturePath: "./",
            },
            content: "comment2",
          },
        ],
      },
      {
        _id: 2,
        owner: {
          _id: 1,
          email: "1@gmail.com",
          password: "pass",
          profilePicturePath: "./",
        },
        title: "other movie",
        content: "text text\n more text\n bla bla bla",
        imagePath: "./",
        comments: [
          {
            _id: 1,
            owner: {
              _id: 2,
              email: "2@gmail.com",
              password: "pass",
              profilePicturePath: "./",
            },
            content: "comment1",
          },
        ],
      },
    ],
  ]);
};

export { mockPosts };
