export class AccessDeniedError extends Error {
  constructor() {
    super('Acesso negado. Verifique sua chave de API')
    this.name = 'AccessDeniedError'
  }
}
