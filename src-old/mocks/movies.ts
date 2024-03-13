import MockAdapter from "axios-mock-adapter";

const mockMovies = (mock: MockAdapter) => {
  // https://search.imdbot.workers.dev/?q=
  mock.onGet(/\/api\/movies\?q=.*/).reply(() => [
    200,
    {
      ok: true,
      description: [
        { "#TITLE": "movie name 1", "#IMDB_ID": 1 },
        { "#TITLE": "movie name 2", "#IMDB_ID": 2 },
      ],
    },
  ]);

  // https://search.imdbot.workers.dev/?tt=tt1160419
  mock.onGet(/\/api\/movies\?tt=.*/).reply(() => [
    200,
    {
      top: { ratingsSummary: { aggregateRating: 8 } },
    },
  ]);
};

export { mockMovies };
