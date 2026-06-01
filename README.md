# Web Technologies Final Project (Frontend)

This repository is the official Angular frontend template for the final project.
Focus on building your application features. The project already includes automated checks for structure, linting, tests, and build.

## Install dependencies

```bash
npm install
```

## Run the project locally

```bash
npm start
```

Open `http://localhost:4200/` in your browser.

## Quality checks (local)

Run all checks:

```bash
npm run quality
```

Teacher grading (score + report):

```bash
npm run grade
```

Run individual checks:

```bash
npm run validate
npm run lint
npm run test:ci
npm run build
```

What each check does:

- `validate`: ensures the minimum required project structure exists.
- `lint`: runs Angular ESLint to enforce basic code quality.
- `test:ci`: runs unit tests once in a headless browser (CI friendly).
- `build`: builds the Angular app to verify it compiles.

## Files and folders students should not edit

Do not edit:

- .github/workflows/\*\*
- scripts/\*\*
- angular.json
- package.json
- package-lock.json
- eslint.config.\*
- tsconfig\*.json

You can edit:

- src/app/features/\*\*
- src/app/shared/\*\*
- src/app/core/services/\*\*
- src/app/core/models/\*\*
- PROJECT_INFO.md
- README.md (only the project-specific sections)

## Project-specific sections to complete

- Fill in [PROJECT_INFO.md](PROJECT_INFO.md) with your group and project details.
- Add any project notes in this README below.

### Project Notes

Add your project-specific notes here.




# ⚽ Olheiro Pro

O **Olheiro Pro** é uma aplicação web full-stack desenvolvida no âmbito do Trabalho Prático II. Funciona como uma ferramenta para fãs de futebol e analistas desportivos, permitindo pesquisar, guardar e comparar jogadores de futebol utilizando dados reais de uma API externa.

## 🎯 Funcionalidades Principais

* **Autenticação:** Sistema completo de Registo e Login para utilizadores.
* **Pesquisa:** Consulta de dados de jogadores e clubes através de uma API externa.
* **Favoritos:** Capacidade de guardar jogadores favoritos na conta do utilizador.
* **Comparador 1v1 (A Arena):** Ecrã dedicado para colocar dois jogadores lado a lado e comparar estatísticas.
* **Histórico no Perfil:** Cada utilizador tem um perfil onde fica guardado o seu histórico de comparações e o seu "cargo" de olheiro, com a possibilidade de editar ou apagar registos.

## 🛠️ Tecnologias Utilizadas

**Frontend:**
* Angular
* CSS puro para um design responsivo e moderno

**Backend:**
* Node.js com Express
* Base de Dados: SQLite
* ORM: Sequelize

**API Externa:**
* [API-Sports / API-Football] (Dados e fotografias dos jogadores)

## 🚀 Como correr o projeto localmente

Para testar a aplicação, é necessário correr o Frontend e o Backend em terminais separados.

### 1. Configurar e arrancar o Backend
Navegue para a pasta do backend:
```bash
cd caminho-para-a-pasta-do-backend
npm install
node server.js