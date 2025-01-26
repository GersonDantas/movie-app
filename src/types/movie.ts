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
  id: number
  name: string
  character: string
  profile_path: string | null
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
  currentMovieCast: Cast[] | null
  loading: boolean
  error: string | null
  filters: FilterOptions
  genres: Genre[]
  activeTab: string
}
