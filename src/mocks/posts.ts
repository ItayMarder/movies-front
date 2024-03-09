import MockAdapter from "axios-mock-adapter";

const mockPosts = (mock: MockAdapter) => {
  mock.onPost("/api/posts").reply(() => [200]);

  mock.onGet("/api/posts").reply(() => [
    200,
    [
      {
        _id: 1,
        user: {
          email: "1@gmail.com",
          password: "pass",
          username: "user1",
          profileImage: "./",
        },
        movieName: "title1",
        content: "text text\n more text\n bla bla bla",
        imageName: "./",
        imdbId: "1",
        date: new Date(),
        comments: [
          {
            _id: 2,
            user: {
              email: "2@gmail.com",
              password: "pass",
              username: "user2",
              profileImage: "./",
            },
            content: "comment1",
            date: new Date(),
          },
          {
            _id: 1,
            user: {
              _id: 3,
              email: "3@gmail.com",
              password: "pass",
              username: "user3",
              profileImage: "./",
            },
            content: "comment2",
            date: new Date(),
          },
        ],
      },
      {
        _id: 2,
        user: {
          _id: 1,
          email: "1@gmail.com",
          password: "pass",
          username: "user1",
          profileImage: "./",
        },
        movieName: "other movie",
        imdbId: "2",
        content: "text text\n more text\n bla bla bla",
        imageName: "./",
        date: new Date(),
        comments: [
          {
            _id: 1,
            user: {
              _id: 2,
              email: "2@gmail.com",
              password: "pass",
              username: "user2",
              profileImage: "./",
            },
            date: new Date(),
            content: "comment1",
          },
        ],
      },
    ],
  ]);

  mock.onGet("/api/posts/my").reply(() => [
    200,
    [
      {
        _id: 1,
        user: {
          email: "1@gmail.com",
          password: "pass",
          username: "user1",
          profileImage: "./",
        },
        movieName: "title1",
        content: "text text\n more text\n bla bla bla",
        imageName: "./",
        imdbId: "1",
        date: new Date(),
        comments: [
          {
            _id: 2,
            user: {
              email: "2@gmail.com",
              password: "pass",
              username: "user2",
              profileImage: "./",
            },
            content: "comment1",
            date: new Date(),
          },
          {
            _id: 1,
            user: {
              _id: 3,
              email: "3@gmail.com",
              password: "pass",
              username: "user3",
              profileImage: "./",
            },
            content: "comment2",
            date: new Date(),
          },
        ],
      },
      {
        _id: 2,
        user: {
          _id: 1,
          email: "1@gmail.com",
          password: "pass",
          username: "user1",
          profileImage: "./",
        },
        movieName: "other movie",
        imdbId: "2",
        content: "text text\n more text\n bla bla bla",
        imageName: "./",
        date: new Date(),
        comments: [
          {
            _id: 1,
            user: {
              _id: 2,
              email: "2@gmail.com",
              password: "pass",
              username: "user2",
              profileImage: "./",
            },
            date: new Date(),
            content: "comment1",
          },
        ],
      },
    ],
  ]);

  mock.onGet(/\/api\/posts\.*/).reply(() => [
    200,
    {
      _id: 1,
      user: {
        email: "1@gmail.com",
        password: "pass",
        username: "user1",
        profileImage: "./",
      },
      movieName: "title1",
      content: "text text\n more text\n bla bla bla",
      imageName: "./",
      imdbId: "1",
      date: new Date(),
      comments: [
        {
          _id: 2,
          user: {
            email: "2@gmail.com",
            password: "pass",
            username: "user2",
            profileImage: "./",
          },
          content: "comment1",
          date: new Date(),
        },
        {
          _id: 1,
          user: {
            _id: 3,
            email: "3@gmail.com",
            password: "pass",
            username: "user3",
            profileImage: "./",
          },
          content: "comment2",
          date: new Date(),
        },
      ],
    },
  ]);

  mock.onPatch(/\/api\/posts\.*/).reply(() => [200, {}]);
  mock.onDelete(/\/api\/posts\.*/).reply(() => [200, {}]);
};

export { mockPosts };
