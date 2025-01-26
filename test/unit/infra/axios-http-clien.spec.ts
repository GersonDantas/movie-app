import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AxiosHttpClient } from '@/infra/axios-http-client'
import axios from 'axios'
import type { HttpRequest } from '@/types/http-client'

vi.mock('axios')

describe('AxiosHttpClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call axios with correct values', async () => {
    const sut = new AxiosHttpClient()
    const request: HttpRequest = {
      url: 'any_url',
      method: 'get',
      body: { any: 'body' },
      headers: { any: 'header' }
    }

    vi.mocked(axios.request).mockResolvedValueOnce({
      status: 200,
      data: {},
      statusText: 'OK',
      headers: {},
      config: {}
    })

    await sut.request(request)

    expect(axios.request).toHaveBeenCalledWith({
      url: request.url,
      method: request.method,
      data: request.body,
      headers: request.headers
    })
  })

  it('should return correct response on success', async () => {
    const sut = new AxiosHttpClient()
    const response = {
      status: 200,
      data: { any: 'data' }
    }
    vi.mocked(axios.request).mockResolvedValueOnce(response)

    const result = await sut.request({ url: 'any_url', method: 'get' })

    expect(result).toEqual({
      statusCode: response.status,
      body: response.data
    })
  })

  it('should return error response when axios fails', async () => {
    const sut = new AxiosHttpClient()
    vi.spyOn(axios, 'request').mockRejectedValueOnce({
      response: { status: 500 }
    })

    const promise = sut.request({ url: 'any_url', method: 'get' })

    await expect(promise).rejects.toThrow('Internal Server Error')
  })
}) 
