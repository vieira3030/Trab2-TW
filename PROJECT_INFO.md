# Project Information

## Group Members

- Student 1: Rodrigo Vieira
- Student 2: André
- Student 3: Eduardo

## Project Theme
Aplicação web de observação e análise de futebol (Olheiro Pro), focada na pesquisa, gestão de favoritos e comparação de estatísticas entre jogadores.

## External API Used

- API name: API-Sports
- API link: https://www.api-football.com/
- Requires API key? Yes

## Backend Repository

- Link: https://github.com/vieira3030/Trab2-TW

## Main Features

1. Autenticação de utilizadores (Registo, Login e Logout).
2. Pesquisa e listagem de jogadores/clubes usando dados da API externa.
3. Guardar e consultar jogadores favoritos.
4. "A Arena": Ecrã de comparação 1v1 entre dois jogadores com gravação de histórico associado ao perfil.

## Pages

- Home: Página Inicial (`/`)
- List: Pesquisa de Clubes (`/search`) e Lista de Favoritos (`/favorites`)
- Detail: Ecrã de Comparação de Jogadores (`/comparar`)
- Form/Create/Edit: Autenticação (`/login`, `/register`) e Edição do Perfil de Utilizador (`/profile`)

## Data Stored in the Backend

Examples:

- users (credenciais e roles de utilizador)
- favorites (jogadores guardados por cada utilizador)
- comparisons (histórico de duelos de jogadores guardados)

## Notes
Frontend desenvolvido em Angular utilizando componentes *standalone* e Guards de autenticação. Backend construído em Node.js com Express, utilizando SQLite como base de dados e Sequelize como ORM (padrão MVC).