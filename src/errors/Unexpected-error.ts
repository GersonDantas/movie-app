export class UnexpectedError extends Error {
  constructor() {
    super('Internal Server Error')
    this.name = 'UnexpectedError'
  }
}
