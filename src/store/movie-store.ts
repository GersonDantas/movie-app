import { defineStore } from 'pinia'
import axios from 'axios'
import type { MovieState, FilterOptions } from '@/types/movie'

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
        const response = await axios.get(`${import.meta.env.VITE_TMDB_BASE_URL}/trending/movie/week`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
          }
        })
        this.trending = response.data.results
      } catch (error) {
        this.error = 'Failed to fetch trending movies'
      } finally {
        this.loading = false
      }
    },

    async fetchPopular() {
      try {
        this.loading = true
        const response = await axios.get(
          `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
            }
          }
        )
        this.popular = response.data.results
      } catch (error) {
        this.error = 'Error fetching popular movies'
      } finally {
        this.loading = false
      }
    },

    async searchMovies(query: string) {
      try {
        this.loading = true
        const response = await axios.get(`${import.meta.env.VITE_TMDB_BASE_URL}/search/movie`, {
          params: { query },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
          }
        })
        this.searchResults = response.data.results
      } catch (error) {
        this.error = 'Failed to search movies'
      } finally {
        this.loading = false
      }
    },

    async fetchMovieDetails(id: string) {
      try {
        this.loading = true
        const response = await axios.get(`${import.meta.env.VITE_TMDB_BASE_URL}/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
          }
        })
        this.currentMovie = response.data
      } catch (error) {
        this.error = 'Failed to fetch movie details'
      } finally {
        this.loading = false
      }
    },

    async fetchGenres() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_TMDB_BASE_URL}/genre/movie/list`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
          }
        })
        this.genres = response.data.genres
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

        const response = await axios.get(`${import.meta.env.VITE_TMDB_BASE_URL}/discover/movie`, {
          params,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
          }
        })
        this.trending = response.data.results
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
