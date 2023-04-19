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

export type AnimeDetails = {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string | null;
  description: string | null;
  genres: [string];
  subOrDub: 'sub' | 'dub';
  type: string | null;
  status: string;
  otherName: string | null;
  totalEpisodes: number;
  episodes: [
    {
      id: string;
      number: number;
      url: string;
    }
  ];
  continueFrom?: string;
};

export type TrendingAnime = AnimeDetails & {
  id: string;
  title: string;
  description: string;
  coverImage: string;
};

export type Episode = {
  id: string;
  number: number;
  url: string;
};

export type StreamingLinkDetails = {
  headers: {
    Referer: string;
    watchsb: string | null;
    'User-Agent': string | null;
  };
  sources: [
    {
      url: string;
      quality: string;
      isM3U8: boolean;
    }
  ];
};

export type SeachResults = {
  currentPage: number;
  hasNextPage: boolean;
  results: [
    {
      id: string;
      title: string;
      image: string;
      releaseDate: string | null;
      subOrDub: 'sub' | 'dub';
    }
  ];
};

export type User = { userId: string; username: string };
