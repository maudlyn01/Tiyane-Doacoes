# Hackathon - Sistema de Gestão de Doações

Este projeto é um sistema completo para gestão de doações, intermediários, comunidades e agentes de campo, desenvolvido para um hackathon.

## Estrutura

- **backend/**: API Node.js/Express com MongoDB
- **frontend/**: Aplicação React + Vite + TypeScript

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 18+
- npm
- MongoDB rodando localmente (ou altere a string de conexão)

---

### Backend

1. Instale as dependências:
    ```sh
    cd backend
    npm install
    ```

2. Configure as variáveis de ambiente em `.env` (exemplo):
    ```
    MONGODB_URI=mongodb://localhost:27017/hackathon
    JWT_SECRET=sua_chave_secreta
    PORT=3001
    ```

3. Inicie o servidor:
    ```sh
    npm run dev
    ```

---

### Frontend

1. Instale as dependências:
    ```sh
    cd frontend
    npm install
    ```

2. Configure o arquivo `.env`:
    ```
    VITE_API_URL=http://localhost:3001
    ```

3. Inicie o frontend:
    ```sh
    npm run dev
    ```

4. **Token JWT:**  
   Enquanto não há tela de login, salve o token manualmente no navegador:
    - Abra o console do navegador (F12)
    - Rode:
      ```js
      localStorage.setItem("token", "SEU_TOKEN_AQUI")
      ```
    - Substitua `"SEU_TOKEN_AQUI"` pelo token recebido do backend.

---

## Principais Funcionalidades

- Cadastro, listagem, edição e remoção de intermediários
- Cadastro e visualização de comunidades
- Cadastro e acompanhamento de doações
- Painel administrativo com filtros e resumos
- Autenticação JWT (token salvo no localStorage)

---

## Tecnologias

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend:** React, Vite, TypeScript, TailwindCSS, Axios

---

## Observações

- O projeto está em desenvolvimento e pode conter endpoints ou telas em construção.
- Para dúvidas ou sugestões, abra uma issue ou entre em contato.

---