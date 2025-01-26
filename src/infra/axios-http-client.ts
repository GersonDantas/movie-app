import { type HttpClient, type HttpResponse, type HttpRequest } from '@/types/http-client'
import { AccessDeniedError, NotFoundError, UnexpectedError } from '@/errors'
import axios, { type AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        params: data.params,
      })

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      }
    } catch (error: any) {
      if (!error.response || error.response.status === 500) {
        throw new UnexpectedError()
      }

      if (error.response.status === 401) {
        throw new AccessDeniedError()
      }

      if (error.response.status === 404) {
        throw new NotFoundError()
      }

      throw error
    }
  }
}
