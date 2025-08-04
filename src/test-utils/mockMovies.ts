import { faker } from "@faker-js/faker";

import type { MoviePoster } from "../../src/api/api";

export const generateMockMovie = (): MoviePoster => ({
    id: faker.number.int({ min: 1, max: 10000 }),
    title: faker.lorem.words(3),
    poster_path: faker.image.url(),
    posterUrl: faker.image.url(),
    overview: faker.lorem.sentence(),
});

export const mockMovies: MoviePoster[] = Array.from({ length: 5 }, generateMockMovie);