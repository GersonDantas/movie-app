import { type HttpClient, type HttpResponse, type HttpRequest } from '@/types/http-client'

import axios, { type AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        axiosResponse = error.response
      } else {
        throw error
      }
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
