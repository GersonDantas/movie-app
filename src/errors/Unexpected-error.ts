export class UnexpectedError extends Error {
  constructor () {
    super('Failed to fetch trending movies')
    this.name = 'UnexpectedError'
  }
}
