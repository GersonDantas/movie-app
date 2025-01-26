export interface Movie {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  overview: string
  release_date: string
  vote_average: number
  runtime: number | null
}

export interface Cast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface Genre {
  id: number
  name: string
}

export interface FilterOptions {
  sortBy: 'popularity' | 'rating' | 'date'
  genre: string
  year: string
}

export interface MovieState {
  trending: Movie[]
  popular: Movie[]
  searchResults: Movie[]
  currentMovie: Movie | null
  currentMovieCredits: MovieCredits | null
  loading: boolean
  error: string | null
  filters: FilterOptions
  genres: Genre[]
  activeTab: string
}

export interface MovieCredits {
  id: number
  cast: Cast[]
  crew: any[]
}

export interface MovieDetails extends Movie {
  budget: number
  genres: Genre[]
  homepage: string | null
  imdb_id: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
}

export interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}
