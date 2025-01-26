import { defineStore } from 'pinia'
import type { MovieState, FilterOptions, Movie, Genre } from '@/types/movie'
import type { HttpClient } from '@/types/http-client'
import { AxiosHttpClient } from '@/infra/axios-http-client'
import { AccessDeniedError, NotFoundError, UnexpectedError } from '@/errors'

const httpClient: HttpClient = new AxiosHttpClient()
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
const AUTH_HEADER = {
  Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  accept: 'application/json'
}

export const useMovieStore = defineStore('movie', {
  state: (): MovieState => ({
    trending: [],
    popular: [],
    searchResults: [],
    currentMovie: null,
    currentMovieCast: null,
    loading: false,
    error: null,
    filters: {
      sortBy: 'popularity',
      genre: '',
      year: ''
    } as FilterOptions,
    genres: [],
    activeTab: 'trending'
  }),

  actions: {
    async fetchTrending() {
      try {
        this.loading = true
        const response = await httpClient.request<{ results: Movie[] }>({
          url: `${BASE_URL}/trending/movie/week`,
          method: 'get',
          headers: AUTH_HEADER
        })
        this.trending = response.body.results
      } catch (error) {
        this.error = 'Failed to fetch trending movies'
      } finally {
        this.loading = false
      }
    },

    async fetchPopular() {
      try {
        this.loading = true
        const response = await httpClient.request<{ results: Movie[] }>({
          url: `${BASE_URL}/movie/popular`,
          method: 'get',
          headers: AUTH_HEADER
        })
        this.popular = response.body.results
      } catch (error) {
        this.error = 'Error fetching popular movies'
      } finally {
        this.loading = false
      }
    },

    async searchMovies(query: string) {
      try {
        this.loading = true
        const response = await httpClient.request<{ results: Movie[] }>({
          url: `${BASE_URL}/search/movie?query=${query}`,
          method: 'get',
          headers: AUTH_HEADER
        })
        this.searchResults = response.body.results
      } catch (error) {
        this.error = 'Failed to search movies'
      } finally {
        this.loading = false
      }
    },

    async fetchMovieDetails(id: string) {
      try {
        this.loading = true
        const movieResponse = await httpClient.request<Movie>({
            url: `${BASE_URL}/movie/${id}`,
            method: 'get',
            headers: AUTH_HEADER
          })
        
        this.currentMovie = movieResponse.body
      } catch (error) {
        this.error = 'Failed to fetch movie details'
      } finally {
        this.loading = false
      }
    },

    async fetchGenres() {
      try {
        const response = await httpClient.request<{ genres: Genre[] }>({
          url: `${BASE_URL}/genre/movie/list`,
          method: 'get',
          headers: AUTH_HEADER
        })
        this.genres = response.body.genres
      } catch (error) {
        this.error = 'Failed to fetch genres'
      }
    },

    async fetchMoviesWithFilters() {
      try {
        this.loading = true
        const params = new URLSearchParams()
        
        if (this.filters.genre) {
          params.append('with_genres', this.filters.genre)
        }
        
        if (this.filters.year) {
          params.append('primary_release_year', this.filters.year)
        }
        
        const sortMap = {
          popularity: 'popularity.desc',
          rating: 'vote_average.desc',
          date: 'primary_release_date.desc'
        }
        params.append('sort_by', sortMap[this.filters.sortBy])

        const paramsObject = Object.fromEntries(params.entries())

        const response = await httpClient.request<{ results: Movie[] }>({
          url: `${BASE_URL}/discover/movie`,
          method: 'get',
          headers: AUTH_HEADER,
          params: paramsObject
        })
        this.trending = response.body.results
      } catch (error) {
        this.error = 'Failed to fetch movies'
      } finally {
        this.loading = false
      }
    },

    updateFilters(filters: FilterOptions) {
      this.filters = filters
      this.fetchMoviesWithFilters()
    },

    setActiveTab(tab: string) {
      this.activeTab = tab
    }
  }
})

export type ReturnTypeMovieStore = ReturnType<typeof useMovieStore>
