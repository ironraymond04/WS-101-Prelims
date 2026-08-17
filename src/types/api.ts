// Shapes for the PokéAPI list endpoint: GET /pokemon?limit=20&offset=0
export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

// Shapes for the PokéAPI detail endpoint: GET /pokemon/{name-or-id}
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    ["official-artwork"]?: {
      front_default: string | null;
    };
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}

// Discriminated union describing the state of any async fetch.
// Consumers can narrow on `status` to safely access `data` or `error`.
export type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };
