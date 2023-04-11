export type TopAiringAnime = {
  id: 'string';
  title: 'string';
  image: 'string';
  releaseDate: 'string' | null;
  subOrDub: 'sub' | 'dub';
};

export type PopularAnime = {
  id: string;
  title: { romaji: string; english: string; native: string; userPreferred: string };
  image: string;
  type: string;
  rating: number;
  releaseDate: string;
};
