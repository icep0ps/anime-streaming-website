export type IAnime = {
  id: string;
  title: {
    english: string;
    romaji: string;
    native: string;
    userPreferred: string;
  };
  cover: string;
  malId: number;
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
  image: string;
  popularity: number;
  color: string;
  description: string;
  status: string;
  releaseDate: number;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  rating: number;
  genres: string[];
  season: string;
  studios: string[];
  type: string;
  recommendations: {
    id: string;
    malId: string;
    title: string[];
    status: string;
    episodes: number;
    image: string;
    cover: string;
    rating: number;
    type: string;
  }[];
  characters: {
    id: string;
    role: string;
    name: string[];
    image: string;
  }[];
  relations: {
    id: number;
    relationType: string;
    malId: number;
    title: string[];
    status: string;
    episodes: number;
    image: string;
    color: string;
    type: string;
    cover: string;
    rating: number;
  }[];
  episodes: {
    id: string;
    title: string;
    episode: string;
    number: number;
    description: string;
  }[];
  continueFrom?: string;
};

export type TrendingAnime = IAnime & {
  id: string;
  title: string;
  description: string;
  cover: string;
  link: string;
};

export type Episode = {
  id: string;
  title: string;
  episode: string;
  number: number;
  description: string;
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
