# TesteFullStack — Gerenciador de Finanças Pessoais

Aplicação fullstack para gerenciamento de finanças pessoais, construída com **ASP.NET Core** (backend) e **React + TypeScript** (frontend).

---

## Arquitetura

O projeto segue os princípios da **Clean Architecture**, separando responsabilidades em camadas bem definidas:

```
TesteFullStack/
├── src/
│   ├── TesteFullStack.API/             # Camada de apresentação (Controllers, Program.cs)
│   ├── TesteFullStack.Application/     # Regras de negócio (Services, DTOs, Validators, Mappings)
│   ├── TesteFullStack.Domain/          # Entidades e Interfaces do domínio
│   └── TesteFullStack.Infrastructure/  # Persistência (EF Core, Repositories, DbContext)
├── tests/
│   └── TesteFullStack.Tests/           # Testes unitários (xUnit)
└── Web/                                # Frontend React (Vite + TypeScript)
```

---

## Tech Stack

### Backend
| Tecnologia | Uso |
|---|---|
| **ASP.NET Core (.NET 10)** | API REST |
| **Entity Framework Core** | ORM |
| **SQLite** | Banco de dados |
| **AutoMapper** | Mapeamento DTO ↔ Entidade |
| **FluentValidation** | Validação de dados |
| **Swagger / OpenAPI** | Documentação da API |

### Frontend
| Tecnologia | Uso |
|---|---|
| **React 19** | UI Library |
| **TypeScript** | Tipagem estática |
| **Vite** | Build tool |
| **TanStack Query (React Query)** | Cache e fetching de dados |
| **React Hook Form + Zod** | Formulários e validação |
| **shadcn/ui + Radix UI** | Componentes de interface |
| **Tailwind CSS** | Estilização |
| **Axios** | Cliente HTTP |
| **Sonner** | Notificações toast |
| **Lucide React** | Ícones |

---

## Funcionalidades

### Dashboard
- Cards de resumo: **Total de Receitas**, **Total de Despesas** e **Saldo Geral** (cor dinâmica)
- Tabela de **totais por pessoa** com receitas, despesas e saldo individual

### Pessoas (CRUD Completo)
- Listagem em tabela com ações de editar e deletar
- Modal de confirmação ao deletar (alerta sobre transações vinculadas)
- Formulário lateral (Sheet) com validação Zod (nome obrigatório, idade ≥ 0)

### Categorias
- Listagem com badges coloridas por finalidade (Despesa = Vermelho, Receita = Verde, Ambas = Azul)
- Formulário de cadastro com select de finalidade

### Transações
- Tabela com descrição, valor (R$), tipo (badge), categoria e pessoa
- **Regras de negócio dinâmicas no formulário:**
  - Se a pessoa é menor de idade → tipo travado como "Despesa"
  - Categorias filtradas pelo tipo selecionado (Despesa/Receita/Ambas)
- Tratamento de erros 400 do backend via toasts

---

## Como Executar

### Pré-requisitos
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)

### Backend

```bash
cd src/TesteFullStack.API/TesteFullStack.API
dotnet run
```

A API estará disponível em `https://localhost:7156`.  
Swagger em `https://localhost:7156/swagger`.

### Frontend

```bash
cd Web
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

---

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/pessoas` | Listar todas as pessoas |
| `GET` | `/api/pessoas/{id}` | Buscar pessoa por ID |
| `GET` | `/api/pessoas/transacoes` | Relatório de totais por pessoa |
| `POST` | `/api/pessoas` | Criar pessoa |
| `PUT` | `/api/pessoas/{id}` | Atualizar pessoa |
| `DELETE` | `/api/pessoas/{id}` | Deletar pessoa |
| `GET` | `/api/categorias` | Listar todas as categorias |
| `GET` | `/api/categorias/{id}` | Buscar categoria por ID |
| `POST` | `/api/categorias` | Criar categoria |
| `GET` | `/api/transacoes` | Listar todas as transações |
| `POST` | `/api/transacoes` | Criar transação |

---

## Estrutura do Frontend

```
Web/src/
├── api/              # Axios client e services (pessoasService, categoriasService, transacoesService)
├── components/ui/    # Componentes shadcn/ui (Button, Table, Sheet, Select, Badge, etc.)
├── features/         # Componentes de feature (formulários de Pessoas, Categorias, Transações)
├── hooks/            # Custom hooks React Query (usePessoas, useCategorias, useTransacoes, useRelatorio)
├── pages/            # Páginas (Dashboard, Pessoas, Categorias, Transacoes)
├── types/            # Interfaces TypeScript (Pessoa, Categoria, Transacao, Relatorio)
└── lib/              # Utilitários (cn helper)
```

---

## Decisões Técnicas

- **Interceptor Axios global**: O backend retorna respostas envelopadas em `{ isSuccess, data }`. Um interceptor no `axiosClient.ts` faz o unwrap automático para todos os services.
- **Enums como string**: O backend serializa enums com `JsonStringEnumConverter`. O frontend usa string enums TypeScript para manter compatibilidade.
- **Validação dupla**: Zod no frontend + FluentValidation no backend garantem integridade dos dados em ambas as camadas.
- **CORS**: Política `AllowAll` habilitada para desenvolvimento.
