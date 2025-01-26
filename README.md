# TMDB Movie App

Uma aplicação web moderna para explorar filmes usando a API do TMDB (The Movie Database). Disponível em [movie-news.netlify.app](https://movie-news.netlify.app/).

## 🎬 Sobre o Projeto

Este projeto é uma aplicação web que permite aos usuários:
- Explorar filmes populares e tendências
- Buscar filmes específicos
- Ver detalhes completos dos filmes
- Visualizar elenco e informações técnicas
- Filtrar filmes por gênero, ano e popularidade

## 🚀 Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript progressivo
- **TypeScript** - Adiciona tipagem estática ao JavaScript
- **Pinia** - Gerenciamento de estado
- **Tailwind CSS** - Framework CSS utilitário
- **Vitest** - Framework de testes unitários
- **Vue Router** - Roteamento oficial do Vue.js
- **Axios** - Cliente HTTP para requisições
- **DayJS** - Biblioteca para manipulação de datas

## 🛠️ Arquitetura

O projeto segue uma arquitetura limpa e modular:
- `/components` - Componentes reutilizáveis
- `/pages` - Páginas da aplicação
- `/store` - Gerenciamento de estado com Pinia
- `/types` - Definições de tipos TypeScript
- `/services` - Serviços e integrações
- `/infra` - Configurações de infraestrutura
- `/test` - Testes unitários e de integração

## 🔍 Funcionalidades Principais

- **Lista de Filmes**
  - Filmes em tendência
  - Filmes populares
  - Sistema de busca

- **Detalhes do Filme**
  - Informações completas
  - Elenco
  - Avaliações
  - Dados técnicos

- **Filtros**
  - Por gênero
  - Por ano
  - Por popularidade

## 🧪 Testes

O projeto possui cobertura de testes unitários usando Vitest:

```bash
npm run test
npm run test:coverage
```

## 🚀 Como Executar

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/tmdb-movie-app.git
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
VITE_TMDB_API_KEY=sua_chave_api
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

4. Execute o projeto
```bash
npm run dev
```

## 📱 Responsividade

A aplicação é totalmente responsiva, adaptando-se a:
- Dispositivos móveis
- Tablets
- Desktops

## 🌐 Deploy

A aplicação está hospedada na [Netlify](https://movie-news.netlify.app/), com CI/CD automático a partir da branch principal.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Por favor, leia o [guia de contribuição](CONTRIBUTING.md) primeiro.
