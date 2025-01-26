export type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export interface HttpRequest {
  url: string
  method: HttpMethod
  body?: any
  headers?: Record<string, string>
  params?: Record<string, string>
}

export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}

export interface HttpClient {
  request: <T = any>(data: HttpRequest) => Promise<HttpResponse<T>>
}

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}
