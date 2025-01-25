import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMovieStore, type ReturnTypeMovieStore } from '@/store/movie-store'
import axios from 'axios'

vi.mock('axios')

type SutTypes = {
  mockResponse: unknown
  method?: 'fetchTrending' | 'searchMovies'
}

const makeSut = async ({ mockResponse, method = 'fetchTrending' }: SutTypes): Promise<ReturnTypeMovieStore> => {
  vi.mocked(axios.get).mockResolvedValueOnce(mockResponse)

  const store = useMovieStore()
  if (method === 'searchMovies') {
    await store[method]('test')
  } else {
    await store[method]()
  }

  return store 
}

describe('MovieStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('has initial state', () => {
    const store = useMovieStore()
    expect(store.trending).toEqual([])
    expect(store.popular).toEqual([])
    expect(store.searchResults).toEqual([])
    expect(store.currentMovie).toBeNull()
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('fetches trending movies successfully', async () => {
    const mockResponse = {
      data: {
        results: [{ id: 1, title: 'Test Movie' }]
      }
    }
    const store = await makeSut({ mockResponse })

    expect(store.trending).toEqual(mockResponse.data.results)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('handles fetch trending error', async () => {
    const store = await makeSut({ mockResponse: new Error('API Error') })
    
    expect(store.trending).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Failed to fetch trending movies')
  })

  it('searches movies successfully', async () => {
    const mockResponse = {
      data: {
        results: [{ id: 2, title: 'Search Result' }]
      }
    }
    const store = await makeSut({ mockResponse, method: 'searchMovies' })

    expect(store.searchResults).toEqual(mockResponse.data.results)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })
}) 
