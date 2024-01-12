import MockAdapter from "axios-mock-adapter";

const mockMovies = (mock: MockAdapter) => {
  mock.onGet("/api/movies").reply(() => [
    200,
    [
      { name: "1", _id: 1 },
      { name: "2", _id: 2 },
    ],
  ]);
};

export { mockMovies };
