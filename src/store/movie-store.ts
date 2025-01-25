import { defineStore } from 'pinia'
import axios from 'axios'

interface Movie {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  overview: string
  release_date: string
  vote_average: number
}

interface MovieState {
  trending: Movie[]
  popular: Movie[]
  searchResults: Movie[]
  currentMovie: Movie | null
  loading: boolean
  error: string | null
}

export const useMovieStore = defineStore('movie', {
  state: (): MovieState => ({
    trending: [],
    popular: [],
    searchResults: [],
    currentMovie: null,
    loading: false,
    error: null
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
    }
  }
}) 
