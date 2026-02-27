# Guia de boas práticas de arquitetura Next.js

Este guia contém boas práticas para projetos Next.js, que DEVEM, obrigatoriamente, ser seguidas pela LLM e pelos desenvolvedores humanos.

## Como usar este guia para desenvolvimento

Este guia deve ser seguido rigorosamente para garantir a consistência e qualidade do código.
Antes de implementar uma classe, a LLM deve se referir ao guia para identificar que classes devem ser criadas/modificadas, quais padrões de codificação devem ser seguidos, e quais princípios arquiteturais devem ser aplicados. Os exemplos de código fornecidos neste guia devem ser usados como referência para a implementação.

## Como usar este guia para refatoração

Caso o projeto já exista e não siga algum dos padrões, tecnologias ou princípios aqui descritos, a LLM deve sugerir a refatoração gradual do código para aderir aos padrões, tecnologias e princípios acima.

Para isso, para cada seção deste guia, a LLM deve analisar o código atual e identificar desvios em relação ao que é especificado. Para classes específicas, a LLM deve usar os exemplos de código fornecidos neste guia como referência para sugerir mudanças.

---

## 1. Tech stack OBRIGATÓRIA

A tech stack base do projeto é:

- Framework: Next.js 15+ (App Router)
- Linguagem: TypeScript
- Biblioteca UI: Tailwind CSS + shadcn/ui
- Pagamento: Polar
- LLM: Vercel AI SDK with OpenRouter (Gemini models)
- Estado: Zustand + React Query (TanStack Query)
- Gráficos: Lightweight Charts + Recharts
- Formulários: React Hook Form + Zod
- Internacionalização: next-intl (PT-BR, EN, ES)
- Analytics: Microsoft Clarity + Google Analytics 4
- Banco de Dados: PostgreSQL + Drizzle ORM
- Cache: Next Cache (ISR) se o backend também é NextJS (se for NestJS, usaremos Redis) + React Query (cache front)
- Observabilidade e Métricas: OpenTelemetry + Prometheus + Grafana (Visualização)
- Autenticação: BetterAuth + ReCAPTCHA v3
- Testes: Vitest + React Testing Library + Cypress
- Linting e formatação: ESLint + Prettier + Commitlint + Sonarlint
- Controle de versão: Git + GitHub
- Telemetria e logs: Sentry (adicionar logs e métricas customizadas)
- CI/CD: GitHub Actions
- Node.js 24+
- PostgreSQL 18+
- pnpm como gerenciador de pacotes

Caso o projeto já exista e não adote alguma dessas tecnologias, a LLM deve sugerir a migração gradual para a tech stack acima.

---

## 2. Padrão de codificação OBRIGATÓRIO

- Nomes de arquivos, pastas, variáveis, funções e classes em inglês
- Comentários em inglês
- Evitar abreviações
- Seguir as regras do ESLint + Prettier
- Seguir as recomendações do Next.js
- Toda literal String, com exceção de mensagens de log, deve ser internacionalizada em Português, Inglês e Espanhol
- Seguir padrão SOLID
- Classes e métodos não utilizados devem ser removidos

Caso o projeto já exista e não siga algum desses padrões, a LLM deve sugerir a refatoração gradual do código para aderir aos padrões acima.

---

### 3. Padrões de nomenclatura OBRIGATÓRIOS

- **Diretórios/Pastas:** `kebab-case` (ex: `user-profile`, `auth-provider`).
- **Componentes React (.tsx):** `PascalCase` (ex: `ProductCard.tsx`, `SubmitButton.tsx`).
- **Hooks (.ts):** `camelCase` iniciado por `use` (ex: `useAuth.ts`, `useDebounce.ts`).
- **Classes, Interfaces e Tipos (.ts):** `PascalCase` (ex: `UserRepository.ts`, `ProductEntity.ts`).
- **Funções Utilitárias, Services e Actions (.ts):** `camelCase` (ex: `formatDate.ts`, `createProduct.action.ts`).
- **Constantes globais:** `UPPER_SNAKE_CASE` (ex: `MAX_RETRY_COUNT`).

---

### 4. Comentários e documentação OBRIGATÓRIOS

- **Idioma:** Todos os comentários devem ser em **Inglês**.
- **JSDoc:** Classes, interfaces e métodos públicos exportados DEVEM ter JSDoc explicando:
  - O que a função faz.
  - Parâmetros (`@param`).
  - Retorno (`@returns`).
  - Exceções lançadas (`@throws`).
- **Complexidade:** Explique o "porquê" de lógicas complexas, não apenas o "como".

---

### 5. Métricas e observabilidade OBRIGATÓRIOS

- A aplicação deve ser instrumentada com **OpenTelemetry**.
- Deve expor um endpoint (ex: `/metrics`) ou exportar para um coletor para ser consumido pelo **Prometheus**.
- Métricas críticas a monitorar:
  - Latência de requisições HTTP e DB.
  - Taxa de erro (4xx, 5xx).
  - Throughput (RPS).
  - Duração de Server Actions.

---

## 6. Princípios direcionadores OBRIGATÓRIOS

- Baixo acoplamento
- Alta coesão
- Separação clara de responsabilidades
- Programar para interfaces, não para implementações
- Código testável
- Performance otimizada (TTFB, LCP, FID)
- Facilidade de manutenção e evolução

Caso o projeto já exista e não siga algum desses princípios, a LLM deve sugerir a refatoração gradual do código para aderir aos princípios acima.

---

## 7. Regras de UI OBRIGATÓRIAS

- Componentes de UI devem ser puros, sem acesso a banco ou regras de negócio
- Componentes de UI devem receber dados via props
- Componentes de UI não devem ter efeitos colaterais (side effects)
- Componentes devem ser acessíveis atendendo às diretrizes WCAG 2.1 AA
- Campos de senha devem ter um botão para mostrar/ocultar a senha
- Manter consistência visual com o design system adotado (shadcn/ui) e entre componentes com o mesmo significado
- Usar Tailwind CSS para estilização
- Evitar CSS customizado sempre que possível
- Detecte componentes parecidos e sugira a criação de componentes reutilizáveis

## 8. Estrutura de diretórios OBRIGATÓRIA

```
src/
├── app/
│   # Camada de UI + boundaries do Next.js (App Router)
│   # Aqui vivem páginas, layouts, server actions e API routes
│   # NÃO contém regra de negócio nem acesso direto a banco
│
│   ├── products/
│   │   # Feature de UI relacionada à rota /products
│   │   # Tudo aqui é específico dessa feature
│   │
│   │   ├── page.tsx
│   │   │   # Página principal da rota /products
│   │   │   # Orquestra componentes, não contém lógica complexa
│   │
│   │   ├── layout.tsx
│   │   │   # Layout exclusivo da feature products
│   │
│   │   ├── loading.tsx
│   │   │   # Fallback de Suspense (carregamento)
│   │
│   │   ├── error.tsx
│   │   │   # Error Boundary da feature
│   │
│   │   ├── _components/
│   │   │   # Componentes de UI EXCLUSIVOS desta feature
│   │   │   # Se virar reutilizável, deve subir para /components
│   │   │
│   │   │   ├── ProductList.tsx
│   │   │   │   # Lista de produtos (client component)
│   │   │
│   │   │   ├── ProductCard.tsx
│   │   │   │   # Card individual de produto
│   │   │
│   │   │   └── ProductFilters.tsx
│   │   │       # Filtros visuais da lista
│   │   │
│   │   ├── _hooks/
│   │   │   # Hooks específicos da feature
│   │   │   # Coordenam estado e chamam actions
│   │   │
│   │   │   └── useProductList.ts
│   │   │       # Hook que busca e gerencia produtos
│   │   │
│   │   ├── _actions/
│   │   │   # Server Actions (lado server)
│   │   │   # Funcionam como composition root
│   │   │
│   │   │   ├── getProducts.action.ts
│   │   │   │   # Action para listar produtos
│   │   │
│   │   │   └── createProduct.action.ts
│   │   │       # Action para criar produto
│   │   │
│   │   ├── _lib/
│   │   │   # Helpers locais da feature (mapeamentos, formatação)
│   │   │
│   │   │   └── productViewMapper.ts
│   │   │       # Converte entidade de domínio em ViewModel
│   │   │
│   │   └── _types/
│   │       # Tipos exclusivos da UI desta feature
│   │
│   │       └── ProductViewModel.ts
│   │           # Tipo usado pelos componentes (não é entidade)
│   │
│   └── api/
│       # API Routes (HTTP)
│       # Usadas quando há consumidores externos ou webhooks
│
│       └── products/
│           └── route.ts
│               # Endpoint HTTP /api/products
│               # Reutiliza os mesmos use cases
│
├── domain/
│   # Núcleo do negócio (Clean Architecture)
│   # NÃO depende de Next.js, banco, Redis ou libs externas
│
│   └── product/
│       # Subdomínio Product
│
│       ├── entities/
│       │   # Entidades de domínio (invariantes + regras)
│       │
│       │   └── Product.entity.ts
│       │       # Representa um Product no domínio
│       │
│       ├── repositories/
│       │   # Contratos (interfaces) de acesso a dados
│       │
│       │   └── ProductRepository.interface.ts
│       │       # Define COMO o domínio acessa produtos
│       │
│       ├── use-cases/
│       │   # Casos de uso (regras de negócio)
│       │
│       │   ├── ListProducts.use-case.ts
│       │   │   # Regra para listar produtos
│       │
│       │   └── CreateProduct.use-case.ts
│       │       # Regra para criar produto
│       │
│       └── errors/
│           # Erros específicos do domínio
│
│           └── InvalidProductPrice.error.ts
│               # Violação de regra de negócio
│
├── infra/
│   # Implementações técnicas
│   # Pode depender de libs, ORM, Redis, APIs externas
│
│   ├── db/
│   │   # Infra de banco de dados
│   │
│   │   ├── drizzle/
│   │   │   └── drizzleClient.ts
│   │   │       # Cliente Drizzle / pool de conexão
│   │   │
│   │   ├── transaction/
│   │   │   └── withTransaction.ts
│   │   │       # Unit of Work / helper de transação
│   │   │
│   │   └── repositories/
│   │       └── DrizzleProductRepository.ts
│   │           # Implementação concreta do repositório
│   │
│   ├── cache/
│   │   # Adapters técnicos de cache
│   │
│   │   └── NextCacheAdapter.ts
│   │       # Cache usando APIs do Next.js
│   │
│   └── http/
│       └── fetchHttpClient.ts
│           # Wrapper para fetch/axios
│
├── shared/
│   # Código transversal (cross-cutting concerns)
│   # Pode ser usado por domain, infra e app
│
│   ├── cache/
│   │   # Abstrações e implementações genéricas de cache
│   │
│   │   ├── Cache.interface.ts
│   │   │   # Contrato genérico de cache
│   │   │
│   │   ├── MemoryCache.ts
│   │   │   # Cache in-memory
│   │   │
│   │   ├── RedisCache.ts
│   │   │   # Cache Redis
│   │   │
│   │   └── index.ts
│   │       # Barrel file
│   │
│   ├── crypto/
│   │   # Criptografia, hashing, segurança
│   │
│   │   ├── Hasher.interface.ts
│   │   │   # Contrato de hash
│   │   │
│   │   ├── ScryptHasher.ts
│   │   │   # Implementação usando scrypt
│   │   │
│   │   └── index.ts
│   │
│   ├── container/
│   │   └── container.ts
│   │       # DI manual / service locator
│   │
│   ├── i18n/
│   │   # Internacionalização
│   │
│   │   ├── i18n.config.ts
│   │   │   # Configuração base
│   │   │
│   │   ├── i18n.server.ts
│   │   │   # Helpers server-side
│   │   │
│   │   └── i18n.client.ts
│   │       # Helpers client-side
│   │
│   ├── auth/
│   │   └── authService.ts
│   │       # Autenticação/autorização genérica
│   │
│   ├── audit/
│   │   └── auditLogger.ts
│   │       # Auditoria e logs de ações
│   │
│   ├── env/
│   │   └── env.ts
│   │       # Leitura e validação de variáveis de ambiente
│   │
│   ├── errors/
│   │   └── AppError.ts
│   │       # Erro base da aplicação
│   │
│   ├── result/
│   │   └── Result.ts
│   │       # Tipo Result<T, E>
│   │
│   ├── pagination/
│   │   └── Pagination.types.ts
│   │       # Tipos genéricos de paginação (PaginationParams, PaginatedResult)
│   │
│   ├── utils/
│   │   ├── html.ts
│   │   ├── relativeTime.ts
│   │   └── objectUtils.ts
│   │
│   └── index.ts
│       # Exports centrais do shared
│
├── components/
│   # Componentes de UI globais e reutilizáveis
│
│   └── Button.tsx
│
├── hooks/
│   # Hooks genéricos reutilizáveis
│
│   └── useDebounce.ts
│
├── types/
│   # Tipos globais (DTOs, paginação etc.)
│
│   └── Pagination.ts
│
└── styles/
    └── globals.css
        # Estilos globais
```

Perguntas e respostas para guiar a definição de onde vão os arquivos e classes, além de definir suas responsabilidades:

### 🎯 Hooks

**P: Onde devo armazenar os hooks de frontend?**
R: Depende do escopo:

- **Hooks genéricos e reutilizáveis** (ex: `useDebounce`, `useLocalStorage`) → `src/hooks/`
- **Hooks específicos de uma feature** (ex: `useProductList`) → `src/app/[feature]/_hooks/`

---

**P: Criei um hook `useProductFilters` que só será usado na página de produtos. Onde coloco?**
R: Em `src/app/products/_hooks/useProductFilters.ts`. Se no futuro ele for reutilizado em outras features, promova-o para `src/hooks/`.

---

### 🧩 Componentes

**P: Onde devo criar componentes de UI?**
R: Depende da reutilização:

- **Componentes globais** (ex: `Button`, `Modal`, `Input`) → `src/components/`
- **Componentes exclusivos de uma feature** → `src/app/[feature]/_components/`

---

**P: Tenho um `ProductCard` usado apenas em `/products`. Onde fica?**
R: Em `src/app/products/_components/ProductCard.tsx`.

---

**P: E se o `ProductCard` passar a ser usado em `/orders` também?**
R: Promova-o para `src/components/ProductCard.tsx` ou crie um componente mais genérico como `src/components/Card.tsx`.

---

### ⚡ Server Actions

**P: Onde coloco Server Actions?**
R: Em `src/app/[feature]/_actions/`. Exemplo:

- `src/app/products/_actions/getProducts.action.ts`
- `src/app/products/_actions/createProduct.action.ts`

---

**P: O que uma Server Action deve fazer?**
R: Atuar como **composition root**: instanciar dependências, chamar use cases do domínio e retornar dados para a UI. **NÃO** deve conter regras de negócio.

```typescript
// src/app/products/_actions/getProducts.action.ts
"use server";
export async function getProducts() {
  const repository = new DrizzleProductRepository();
  const useCase = new ListProductsUseCase(repository);
  return useCase.execute();
}
```

---

### 🏛️ Domain (Núcleo de Negócio)

**P: Onde coloco entidades de domínio?**
R: Em `src/domain/[subdomínio]/entities/`. Exemplo: `src/domain/product/entities/Product.entity.ts`

---

**P: Onde ficam os casos de uso (use cases)?**
R: Em `src/domain/[subdomínio]/use-cases/`. Exemplo:

- `src/domain/product/use-cases/ListProducts.use-case.ts`
- `src/domain/product/use-cases/CreateProduct.use-case.ts`

---

**P: Posso importar Drizzle, Prisma ou Next.js dentro de `src/domain/`?**
R: **NÃO.** O domínio deve ser puro e independente de frameworks, ORMs e libs externas. Use interfaces (contratos) e inverta as dependências.

---

**P: Onde defino a interface de um repositório?**
R: Em `src/domain/[subdomínio]/repositories/`. Exemplo: `src/domain/product/repositories/ProductRepository.interface.ts`

---

**P: Onde coloco erros de regra de negócio?**
R: Em `src/domain/[subdomínio]/errors/`. Exemplo: `src/domain/product/errors/InvalidProductPrice.error.ts`

---

### 🔧 Infra (Implementações Técnicas)

**P: Onde fica a implementação concreta de um repositório?**
R: Em `src/infra/db/repositories/`. Exemplo: `src/infra/db/repositories/DrizzleProductRepository.ts`

---

**P: Onde configuro o cliente do banco de dados (Drizzle, Prisma)?**
R: Em `src/infra/db/[orm]/`. Exemplo: `src/infra/db/drizzle/drizzleClient.ts`

---

**P: Onde coloco lógica de transações (Unit of Work)?**
R: Em `src/infra/db/transaction/`. Exemplo: `src/infra/db/transaction/withTransaction.ts`

---

**P: Onde fica um adapter de cache específico do Next.js?**
R: Em `src/infra/cache/`. Exemplo: `src/infra/cache/NextCacheAdapter.ts`

---

**P: Onde coloco um wrapper de HTTP (fetch/axios)?**
R: Em `src/infra/http/`. Exemplo: `src/infra/http/fetchHttpClient.ts`

---

### 🔄 Shared (Código Transversal)

**P: Onde coloco código que pode ser usado por domain, infra e app?**
R: Em `src/shared/`. Exemplos:

- Interfaces genéricas de cache → `src/shared/cache/Cache.interface.ts`
- Implementações de hash → `src/shared/crypto/ScryptHasher.ts`
- Tipos de paginação → `src/shared/pagination/Pagination.types.ts`
- Tipo Result<T, E> → `src/shared/result/Result.ts`

---

**P: Onde fica a configuração de i18n?**
R: Em `src/shared/i18n/`:

- `i18n.config.ts` - Configuração base
- `i18n.server.ts` - Helpers server-side
- `i18n.client.ts` - Helpers client-side

---

**P: Onde coloco validação de variáveis de ambiente?**
R: Em `src/shared/env/env.ts`

---

**P: Onde fica o container de DI (Dependency Injection)?**
R: Em `src/shared/container/container.ts`

---

**P: Onde coloco utilitários genéricos (formatação de data, strings)?**
R: Em `src/shared/utils/`. Exemplo:

- `src/shared/utils/relativeTime.ts`
- `src/shared/utils/objectUtils.ts`

---

### 📝 Types e ViewModels

**P: Onde coloco tipos globais (DTOs, paginação)?**
R: Em `src/types/`. Exemplo: `src/types/Pagination.ts`

---

**P: Onde coloco tipos específicos da UI de uma feature?**
R: Em `src/app/[feature]/_types/`. Exemplo: `src/app/products/_types/ProductViewModel.ts`

---

**P: Qual a diferença entre Entity e ViewModel?**
R:

- **Entity** (`src/domain/`) → Representa o conceito no domínio, contém regras e invariantes
- **ViewModel** (`src/app/[feature]/_types/`) → Representa o dado formatado para a UI, sem regras de negócio

---

**P: Onde coloco o mapper que converte Entity → ViewModel?**
R: Em `src/app/[feature]/_lib/`. Exemplo: `src/app/products/_lib/productViewMapper.ts`

---

### 🌐 API Routes

**P: Quando usar API Routes vs Server Actions?**
R:

- **Server Actions** → Consumo interno pela UI Next.js
- **API Routes** → Consumidores externos, webhooks, integrações

---

**P: Onde ficam as API Routes?**
R: Em `src/app/api/[recurso]/route.ts`. Exemplo: `src/app/api/products/route.ts`

---

**P: API Routes devem conter regras de negócio?**
R: **NÃO.** Devem reutilizar os mesmos use cases do domínio, assim como as Server Actions.

---

### 📁 Convenções de Nomenclatura

**P: Por que usar underscore nas pastas (`_components`, `_hooks`)?**
R: O underscore indica que a pasta é **privada da feature** e não deve ser importada de fora. Também evita conflitos com rotas do Next.js.

---

**P: Qual convenção de nomenclatura para arquivos?**
R:

- Entidades: `Product.entity.ts`
- Use Cases: `ListProducts.use-case.ts`
- Interfaces: `ProductRepository.interface.ts`
- Erros: `InvalidProductPrice.error.ts`
- Actions: `getProducts.action.ts`
- ViewModels: `ProductViewModel.ts`
- Componentes: `ProductCard.tsx`

---

### 🎯 Decisões Rápidas

| Pergunta                 | Resposta                                |
| ------------------------ | --------------------------------------- |
| Regra de negócio         | `src/domain/[subdomínio]/use-cases/`    |
| Acesso ao banco          | `src/infra/db/repositories/`            |
| Componente global        | `src/components/`                       |
| Componente de feature    | `src/app/[feature]/_components/`        |
| Hook global              | `src/hooks/`                            |
| Hook de feature          | `src/app/[feature]/_hooks/`             |
| Server Action            | `src/app/[feature]/_actions/`           |
| Interface de repositório | `src/domain/[subdomínio]/repositories/` |
| Cache genérico           | `src/shared/cache/`                     |
| Tipo global              | `src/types/`                            |
| Tipo de UI da feature    | `src/app/[feature]/_types/`             |

---

### ⚠️ Regras de Ouro

1. **O domínio NUNCA importa de infra ou app**
2. **Server Actions são composition roots, não contêm lógica de negócio**
3. **Se algo é reutilizável, promova para o nível superior**
4. **Use interfaces para inverter dependências**
5. **ViewModels são para UI, Entities são para domínio**

---

## 9. Autenticações a serem suportadas OBRIGATÓRIAMENTE

Google, Apple, e-mail/senha, login fácil (envio de código via e-mail).

---

## 10. Regras sobre cache

```
Se é leitura estável    → Cache no servidor (Next `unstable_cache` / `fetch` cache)
Se é interação          → Cache no client (React Query)
Se altera estado        → Server Action → Revalidate Path/Tag
Se acessa banco         → Repository (Implementação concreta lida com cache se necessário)
```

---

## 11. Exemplo de código para cada arquivo de uma funcionalidade CRUD

A seguir, exemplos completos de código para uma funcionalidade CRUD de **Product**, seguindo todos os padrões de arquitetura especificados.

---

## 12. Exemplo de código para cada arquivo de alguma funcionalidade CRUD.

### 1. Camada de Domínio (`src/domain/`)

#### 1.1. Entidade: `src/domain/product/entities/Product.entity.ts`

```typescript
import { InvalidProductPriceError } from "../errors/InvalidProductPrice.error";
import { InvalidProductNameError } from "../errors/InvalidProductName.error";

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
  isActive?: boolean;
}

/**
 * Product domain entity.
 * Contains business rules and invariants for a product.
 */
export class Product {
  private constructor(private props: ProductProps) {
    this.validate();
  }

  // Factory method for creating a new product
  static create(input: CreateProductInput, idGenerator: () => string): Product {
    const now = new Date();
    return new Product({
      id: idGenerator(),
      name: input.name.trim(),
      description: input.description.trim(),
      price: input.price,
      stock: input.stock,
      categoryId: input.categoryId,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Factory method for reconstituting from persistence
  static reconstitute(props: ProductProps): Product {
    return new Product(props);
  }

  // Business rule: validate invariants
  private validate(): void {
    if (this.props.price < 0) {
      throw new InvalidProductPriceError(this.props.price);
    }

    if (this.props.name.length < 3 || this.props.name.length > 255) {
      throw new InvalidProductNameError(this.props.name);
    }

    if (this.props.stock < 0) {
      throw new Error("Stock cannot be negative");
    }
  }

  // Business method: update product
  update(input: UpdateProductInput): void {
    if (input.name !== undefined) {
      this.props.name = input.name.trim();
    }
    if (input.description !== undefined) {
      this.props.description = input.description.trim();
    }
    if (input.price !== undefined) {
      this.props.price = input.price;
    }
    if (input.stock !== undefined) {
      this.props.stock = input.stock;
    }
    if (input.categoryId !== undefined) {
      this.props.categoryId = input.categoryId;
    }
    if (input.isActive !== undefined) {
      this.props.isActive = input.isActive;
    }

    this.props.updatedAt = new Date();
    this.validate();
  }

  // Business method: deactivate product
  deactivate(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  // Business method: activate product
  activate(): void {
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }

  // Business method: decrease stock
  decreaseStock(quantity: number): void {
    if (quantity > this.props.stock) {
      throw new Error("Insufficient stock");
    }
    this.props.stock -= quantity;
    this.props.updatedAt = new Date();
  }

  // Business method: increase stock
  increaseStock(quantity: number): void {
    this.props.stock += quantity;
    this.props.updatedAt = new Date();
  }

  // Getters (read-only access to properties)
  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get price(): number {
    return this.props.price;
  }

  get stock(): number {
    return this.props.stock;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Convert to plain object for persistence
  toObject(): ProductProps {
    return { ...this.props };
  }
}
```

---

#### 1.2. Erros de Domínio: `src/domain/product/errors/InvalidProductPrice.error.ts`

```typescript
import { DomainError } from "@/shared/errors/DomainError";

export class InvalidProductPriceError extends DomainError {
  constructor(price: number) {
    super(
      `Invalid product price: ${price}. Price must be a non-negative number.`,
    );
    this.name = "InvalidProductPriceError";
  }
}
```

#### `src/domain/product/errors/InvalidProductName.error.ts`

```typescript
import { DomainError } from "@/shared/errors/DomainError";

export class InvalidProductNameError extends DomainError {
  constructor(name: string) {
    super(
      `Invalid product name: "${name}". Name must be between 3 and 255 characters.`,
    );
    this.name = "InvalidProductNameError";
  }
}
```

#### `src/domain/product/errors/ProductNotFound.error.ts`

```typescript
import { DomainError } from "@/shared/errors/DomainError";

export class ProductNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Product with id "${id}" was not found.`);
    this.name = "ProductNotFoundError";
  }
}
```

---

#### 1.3. Interface do Repositório: `src/domain/product/repositories/ProductRepository.interface.ts`

```typescript
import { Product } from "../entities/Product.entity";
import {
  PaginationParams,
  PaginatedResult,
} from "@/shared/pagination/Pagination.types";

export interface ProductFilters {
  categoryId?: string;
  isActive?: boolean;
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Repository interface for Product domain.
 * Defines the contract for data access without implementation details.
 */
export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(
    filters: ProductFilters,
    pagination: PaginationParams,
  ): Promise<PaginatedResult<Product>>;
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
  existsByName(name: string, excludeId?: string): Promise<boolean>;
}
```

---

#### 1.4. Use Cases: `src/domain/product/use-cases/ListProducts.use-case.ts`

```typescript
import {
  ProductRepository,
  ProductFilters,
} from "../repositories/ProductRepository.interface";
import {
  PaginationParams,
  PaginatedResult,
} from "@/shared/pagination/Pagination.types";
import { Product } from "../entities/Product.entity";

export interface ListProductsInput {
  filters: ProductFilters;
  pagination: PaginationParams;
}

export type ListProductsOutput = PaginatedResult<Product>;

/**
 * Use case for listing products with filters and pagination.
 */
export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: ListProductsInput): Promise<ListProductsOutput> {
    const { filters, pagination } = input;

    // Apply default pagination values
    const normalizedPagination: PaginationParams = {
      page: Math.max(1, pagination.page),
      pageSize: Math.min(100, Math.max(1, pagination.pageSize)),
    };

    return this.productRepository.findAll(filters, normalizedPagination);
  }
}
```

#### `src/domain/product/use-cases/GetProduct.use-case.ts`

```typescript
import { ProductRepository } from "../repositories/ProductRepository.interface";
import { Product } from "../entities/Product.entity";
import { ProductNotFoundError } from "../errors/ProductNotFound.error";

export interface GetProductInput {
  id: string;
}

export type GetProductOutput = Product;

/**
 * Use case for retrieving a single product by ID.
 */
export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: GetProductInput): Promise<GetProductOutput> {
    const product = await this.productRepository.findById(input.id);

    if (!product) {
      throw new ProductNotFoundError(input.id);
    }

    return product;
  }
}
```

#### `src/domain/product/use-cases/CreateProduct.use-case.ts`

```typescript
import { ProductRepository } from "../repositories/ProductRepository.interface";
import { Product, CreateProductInput } from "../entities/Product.entity";
import { IdGenerator } from "@/shared/id/IdGenerator.interface";

export interface CreateProductUseCaseInput extends CreateProductInput {}

export type CreateProductOutput = Product;

/**
 * Use case for creating a new product.
 */
export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly idGenerator: IdGenerator,
  ) {}

  async execute(
    input: CreateProductUseCaseInput,
  ): Promise<CreateProductOutput> {
    // Check if product with same name already exists
    const nameExists = await this.productRepository.existsByName(input.name);
    if (nameExists) {
      throw new Error(`Product with name "${input.name}" already exists.`);
    }

    // Create the product entity (applies domain rules)
    const product = Product.create(input, () => this.idGenerator.generate());

    // Persist the product
    await this.productRepository.save(product);

    return product;
  }
}
```

#### `src/domain/product/use-cases/UpdateProduct.use-case.ts`

```typescript
import { ProductRepository } from "../repositories/ProductRepository.interface";
import { Product, UpdateProductInput } from "../entities/Product.entity";
import { ProductNotFoundError } from "../errors/ProductNotFound.error";

export interface UpdateProductUseCaseInput {
  id: string;
  data: UpdateProductInput;
}

export type UpdateProductOutput = Product;

/**
 * Use case for updating an existing product.
 */
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    input: UpdateProductUseCaseInput,
  ): Promise<UpdateProductOutput> {
    const { id, data } = input;

    // Find existing product
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new ProductNotFoundError(id);
    }

    // Check name uniqueness if name is being updated
    if (data.name) {
      const nameExists = await this.productRepository.existsByName(
        data.name,
        id,
      );
      if (nameExists) {
        throw new Error(`Product with name "${data.name}" already exists.`);
      }
    }

    // Apply updates (domain entity validates)
    product.update(data);

    // Persist changes
    await this.productRepository.update(product);

    return product;
  }
}
```

#### `src/domain/product/use-cases/DeleteProduct.use-case.ts`

```typescript
import { ProductRepository } from "../repositories/ProductRepository.interface";
import { ProductNotFoundError } from "../errors/ProductNotFound.error";

export interface DeleteProductInput {
  id: string;
}

/**
 * Use case for deleting a product (soft delete via deactivation).
 */
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: DeleteProductInput): Promise<void> {
    const { id } = input;

    // Find existing product
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new ProductNotFoundError(id);
    }

    // Soft delete: deactivate instead of hard delete
    product.deactivate();
    await this.productRepository.update(product);
  }
}
```

---

### 2. Camada de Infraestrutura (`src/infra/`)

#### 2.1. Cliente Drizzle: `src/infra/db/drizzle/drizzleClient.ts`

```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "@/shared/env/env";

// Connection pool for production
const connectionString = env.DATABASE_URL;

const client = postgres(connectionString, {
  max: env.DATABASE_POOL_SIZE,
  idle_timeout: env.DATABASE_IDLE_TIMEOUT,
  connect_timeout: env.DATABASE_CONNECT_TIMEOUT,
});

export const db = drizzle(client, { schema });

export type Database = typeof db;
```

#### 2.2. Schema Drizzle: `src/infra/db/drizzle/schema/products.ts`

```typescript
import {
  pgTable,
  uuid,
  varchar,
  text,
  decimal,
  integer,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    stock: integer("stock").notNull().default(0),
    categoryId: uuid("category_id").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    nameIndex: index("products_name_idx").on(table.name),
    categoryIndex: index("products_category_idx").on(table.categoryId),
    activeIndex: index("products_active_idx").on(table.isActive),
  }),
);

export type ProductRow = typeof products.$inferSelect;
export type InsertProductRow = typeof products.$inferInsert;
```

#### 2.3. Implementação do Repositório: `src/infra/db/repositories/DrizzleProductRepository.ts`

```typescript
import { eq, and, ilike, gte, lte, ne, count, SQL, sql } from "drizzle-orm";
import { db, Database } from "../drizzle/drizzleClient";
import { products, ProductRow } from "../drizzle/schema/products";
import {
  ProductRepository,
  ProductFilters,
} from "@/domain/product/repositories/ProductRepository.interface";
import {
  PaginationParams,
  PaginatedResult,
} from "@/shared/pagination/Pagination.types";
import {
  Product,
  ProductProps,
} from "@/domain/product/entities/Product.entity";

/**
 * Drizzle ORM implementation of ProductRepository.
 */
export class DrizzleProductRepository implements ProductRepository {
  constructor(private readonly database: Database = db) {}

  async findById(id: string): Promise<Product | null> {
    const result = await this.database
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return this.toDomain(result[0]);
  }

  async findAll(
    filters: ProductFilters,
    pagination: PaginationParams,
  ): Promise<PaginatedResult<Product>> {
    const conditions = this.buildFilterConditions(filters);
    const offset = (pagination.page - 1) * pagination.pageSize;

    // Execute count and data queries in parallel
    const [countResult, dataResult] = await Promise.all([
      this.database
        .select({ count: count() })
        .from(products)
        .where(and(...conditions)),
      this.database
        .select()
        .from(products)
        .where(and(...conditions))
        .limit(pagination.pageSize)
        .offset(offset)
        .orderBy(products.createdAt),
    ]);

    const total = countResult[0]?.count ?? 0;
    const totalPages = Math.ceil(total / pagination.pageSize);

    return {
      data: dataResult.map((row) => this.toDomain(row)),
      total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages,
    };
  }

  async save(product: Product): Promise<void> {
    const row = this.toRow(product);
    await this.database.insert(products).values(row);
  }

  async update(product: Product): Promise<void> {
    const row = this.toRow(product);
    await this.database
      .update(products)
      .set(row)
      .where(eq(products.id, product.id));
  }

  async delete(id: string): Promise<void> {
    await this.database.delete(products).where(eq(products.id, id));
  }

  async existsByName(name: string, excludeId?: string): Promise<boolean> {
    const conditions: SQL[] = [eq(products.name, name)];

    if (excludeId) {
      conditions.push(ne(products.id, excludeId));
    }

    const result = await this.database
      .select({ count: count() })
      .from(products)
      .where(and(...conditions));

    return (result[0]?.count ?? 0) > 0;
  }

  private buildFilterConditions(filters: ProductFilters): SQL[] {
    const conditions: SQL[] = [];

    if (filters.categoryId) {
      conditions.push(eq(products.categoryId, filters.categoryId));
    }

    if (filters.isActive !== undefined) {
      conditions.push(eq(products.isActive, filters.isActive));
    }

    if (filters.searchTerm) {
      conditions.push(ilike(products.name, `%${filters.searchTerm}%`));
    }

    if (filters.minPrice !== undefined) {
      conditions.push(gte(products.price, filters.minPrice.toString()));
    }

    if (filters.maxPrice !== undefined) {
      conditions.push(lte(products.price, filters.maxPrice.toString()));
    }

    return conditions;
  }

  private toDomain(row: ProductRow): Product {
    const props: ProductProps = {
      id: row.id,
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      stock: row.stock,
      categoryId: row.categoryId,
      isActive: row.isActive,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };

    return Product.reconstitute(props);
  }

  private toRow(product: Product): ProductRow {
    const obj = product.toObject();
    return {
      id: obj.id,
      name: obj.name,
      description: obj.description,
      price: obj.price.toString(),
      stock: obj.stock,
      categoryId: obj.categoryId,
      isActive: obj.isActive,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  }
}
```

#### 2.4. Transaction Helper: `src/infra/db/transaction/withTransaction.ts`

```typescript
import { db, Database } from "../drizzle/drizzleClient";

export type TransactionCallback<T> = (tx: Database) => Promise<T>;

/**
 * Executes a callback within a database transaction.
 * Automatically commits on success and rolls back on error.
 */
export async function withTransaction<T>(
  callback: TransactionCallback<T>,
): Promise<T> {
  return db.transaction(async (tx) => {
    return callback(tx as unknown as Database);
  });
}
```

---

### 3. Camada Shared (`src/shared/`)

#### 3.1. Erro Base: `src/shared/errors/AppError.ts`

```typescript
/**
 * Base error class for application errors.
 */
export abstract class AppError extends Error {
  public readonly isOperational: boolean;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
```

#### `src/shared/errors/DomainError.ts`

```typescript
import { AppError } from "./AppError";

/**
 * Base error class for domain-specific errors.
 */
export class DomainError extends AppError {
  constructor(message: string) {
    super(message, 400, true);
    this.name = "DomainError";
  }
}
```

#### 3.2. Result Type: `src/shared/result/Result.ts`

```typescript
/**
 * Result type for explicit error handling without exceptions.
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export const Result = {
  ok<T>(data: T): Result<T, never> {
    return { success: true, data };
  },

  fail<E>(error: E): Result<never, E> {
    return { success: false, error };
  },

  isOk<T, E>(result: Result<T, E>): result is { success: true; data: T } {
    return result.success;
  },

  isFail<T, E>(result: Result<T, E>): result is { success: false; error: E } {
    return !result.success;
  },
};
```

#### 3.3. Pagination Types: `src/shared/pagination/Pagination.types.ts`

```typescript
/**
 * Parameters for paginated queries.
 * Used by repositories across all domains.
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * Generic paginated result wrapper.
 * Used to return paginated data from repositories.
 * @template T - The type of items in the data array
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Helper function to create an empty paginated result.
 * @template T - The type of items in the data array
 */
export function emptyPaginatedResult<T>(
  page: number = 1,
  pageSize: number = 10,
): PaginatedResult<T> {
  return {
    data: [],
    total: 0,
    page,
    pageSize,
    totalPages: 0,
  };
}

/**
 * Helper function to calculate total pages.
 */
export function calculateTotalPages(total: number, pageSize: number): number {
  return Math.ceil(total / pageSize);
}

/**
 * Helper function to normalize pagination params with bounds.
 */
export function normalizePagination(
  params: PaginationParams,
  maxPageSize: number = 100,
): PaginationParams {
  return {
    page: Math.max(1, params.page),
    pageSize: Math.min(maxPageSize, Math.max(1, params.pageSize)),
  };
}
```

#### 3.4. ID Generator: `src/shared/id/IdGenerator.interface.ts`

```typescript
/**
 * Interface for generating unique identifiers.
 */
export interface IdGenerator {
  generate(): string;
}
```

#### `src/shared/id/UuidGenerator.ts`

```typescript
import { randomUUID } from "crypto";
import { IdGenerator } from "./IdGenerator.interface";

/**
 * UUID v4 implementation of IdGenerator.
 */
export class UuidGenerator implements IdGenerator {
  generate(): string {
    return randomUUID();
  }
}
```

#### 3.5. Environment Variables: `src/shared/env/env.ts`

```typescript
import { z } from "zod";

/**
 * Error thrown when a required environment variable is missing.
 */
export class MissingEnvError extends Error {
  constructor(key: string) {
    super(`Missing required environment variable: ${key}`);
    this.name = "MissingEnvError";
  }
}

/**
 * Gets a required environment variable.
 * Throws MissingEnvError if the variable is not defined.
 * @param key - The environment variable name
 * @returns The environment variable value
 * @throws MissingEnvError if the variable is not defined
 */
export function requireEnv(key: string): string {
  const value = process.env[key];
  if (value === undefined || value === "") {
    throw new MissingEnvError(key);
  }
  return value;
}

/**
 * Gets an optional environment variable with a default value.
 * @param key - The environment variable name
 * @param defaultValue - The default value if the variable is not defined
 * @returns The environment variable value or the default value
 */
export function optEnv(key: string, defaultValue: string): string {
  const value = process.env[key];
  return value !== undefined && value !== "" ? value : defaultValue;
}

/**
 * Gets an optional numeric environment variable with a default value.
 * @param key - The environment variable name
 * @param defaultValue - The default numeric value if the variable is not defined
 * @returns The environment variable value as a number or the default value
 */
export function optEnvNumber(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (value === undefined || value === "") {
    return defaultValue;
  }
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Gets an optional boolean environment variable with a default value.
 * Accepts 'true', '1', 'yes' as true values (case-insensitive).
 * @param key - The environment variable name
 * @param defaultValue - The default boolean value if the variable is not defined
 * @returns The environment variable value as a boolean or the default value
 */
export function optEnvBoolean(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (value === undefined || value === "") {
    return defaultValue;
  }
  return ["true", "1", "yes"].includes(value.toLowerCase());
}

// Schema for validating all environment variables at once
const envSchema = z.object({
  // Application
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Database
  DATABASE_URL: z.string().url(),
  DATABASE_POOL_SIZE: z.coerce.number().default(10),
  DATABASE_IDLE_TIMEOUT: z.coerce.number().default(20),
  DATABASE_CONNECT_TIMEOUT: z.coerce.number().default(10),

  // Authentication
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),

  // ReCAPTCHA (optional)
  RECAPTCHA_SITE_KEY: z.string().optional(),
  RECAPTCHA_SECRET_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "Invalid environment variables:",
    parsed.error.flatten().fieldErrors,
  );
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
```

#### 3.6. Container (DI): `src/shared/container/container.ts`

```typescript
import { DrizzleProductRepository } from "@/infra/db/repositories/DrizzleProductRepository";
import { UuidGenerator } from "@/shared/id/UuidGenerator";
import { ProductRepository } from "@/domain/product/repositories/ProductRepository.interface";
import { IdGenerator } from "@/shared/id/IdGenerator.interface";
import { ListProductsUseCase } from "@/domain/product/use-cases/ListProducts.use-case";
import { GetProductUseCase } from "@/domain/product/use-cases/GetProduct.use-case";
import { CreateProductUseCase } from "@/domain/product/use-cases/CreateProduct.use-case";
import { UpdateProductUseCase } from "@/domain/product/use-cases/UpdateProduct.use-case";
import { DeleteProductUseCase } from "@/domain/product/use-cases/DeleteProduct.use-case";

/**
 * Simple dependency injection container.
 * Creates and wires up dependencies.
 */
class Container {
  // Infrastructure
  private _productRepository?: ProductRepository;
  private _idGenerator?: IdGenerator;

  // Use Cases
  private _listProductsUseCase?: ListProductsUseCase;
  private _getProductUseCase?: GetProductUseCase;
  private _createProductUseCase?: CreateProductUseCase;
  private _updateProductUseCase?: UpdateProductUseCase;
  private _deleteProductUseCase?: DeleteProductUseCase;

  get productRepository(): ProductRepository {
    if (!this._productRepository) {
      this._productRepository = new DrizzleProductRepository();
    }
    return this._productRepository;
  }

  get idGenerator(): IdGenerator {
    if (!this._idGenerator) {
      this._idGenerator = new UuidGenerator();
    }
    return this._idGenerator;
  }

  get listProductsUseCase(): ListProductsUseCase {
    if (!this._listProductsUseCase) {
      this._listProductsUseCase = new ListProductsUseCase(
        this.productRepository,
      );
    }
    return this._listProductsUseCase;
  }

  get getProductUseCase(): GetProductUseCase {
    if (!this._getProductUseCase) {
      this._getProductUseCase = new GetProductUseCase(this.productRepository);
    }
    return this._getProductUseCase;
  }

  get createProductUseCase(): CreateProductUseCase {
    if (!this._createProductUseCase) {
      this._createProductUseCase = new CreateProductUseCase(
        this.productRepository,
        this.idGenerator,
      );
    }
    return this._createProductUseCase;
  }

  get updateProductUseCase(): UpdateProductUseCase {
    if (!this._updateProductUseCase) {
      this._updateProductUseCase = new UpdateProductUseCase(
        this.productRepository,
      );
    }
    return this._updateProductUseCase;
  }

  get deleteProductUseCase(): DeleteProductUseCase {
    if (!this._deleteProductUseCase) {
      this._deleteProductUseCase = new DeleteProductUseCase(
        this.productRepository,
      );
    }
    return this._deleteProductUseCase;
  }
}

export const container = new Container();
```

---

### 4. Camada de Aplicação (`src/app/`)

#### 4.1. Types (ViewModels): `src/app/products/_types/ProductViewModel.ts`

```typescript
/**
 * ViewModel for displaying a product in the UI.
 * Decoupled from domain entity.
 */
export interface ProductViewModel {
  id: string;
  name: string;
  description: string;
  formattedPrice: string;
  price: number;
  stock: number;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
  categoryId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListViewModel {
  products: ProductViewModel[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ProductFiltersViewModel {
  searchTerm?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
}
```

#### 4.2. Mappers: `src/app/products/_lib/productViewMapper.ts`

```typescript
import { Product } from "@/domain/product/entities/Product.entity";
import { PaginatedResult } from "@/shared/pagination/Pagination.types";
import {
  ProductViewModel,
  ProductListViewModel,
} from "../_types/ProductViewModel";

/**
 * Maps domain entities to view models for UI consumption.
 */
export function mapProductToViewModel(
  product: Product,
  locale: string = "pt-BR",
): ProductViewModel {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
  });

  const stockStatus = getStockStatus(product.stock);

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    formattedPrice: formatter.format(product.price),
    price: product.price,
    stock: product.stock,
    stockStatus,
    categoryId: product.categoryId,
    isActive: product.isActive,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export function mapProductListToViewModel(
  result: PaginatedResult<Product>,
  locale: string = "pt-BR",
): ProductListViewModel {
  return {
    products: result.data.map((product) =>
      mapProductToViewModel(product, locale),
    ),
    pagination: {
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
      totalPages: result.totalPages,
      hasNextPage: result.page < result.totalPages,
      hasPreviousPage: result.page > 1,
    },
  };
}

function getStockStatus(
  stock: number,
): "in_stock" | "low_stock" | "out_of_stock" {
  if (stock === 0) return "out_of_stock";
  if (stock <= 10) return "low_stock";
  return "in_stock";
}
```

#### 4.3. Server Actions: `src/app/products/_actions/getProducts.action.ts`

```typescript
"use server";

import { container } from "@/shared/container/container";
import { mapProductListToViewModel } from "../_lib/productViewMapper";
import {
  ProductListViewModel,
  ProductFiltersViewModel,
} from "../_types/ProductViewModel";
import { getLocale } from "next-intl/server";
import { unstable_cache } from "next/cache";
import * as Sentry from "@sentry/nextjs";

interface GetProductsInput {
  filters?: ProductFiltersViewModel;
  page?: number;
  pageSize?: number;
}

/**
 * Server Action to fetch products with caching.
 */
export async function getProducts(
  input: GetProductsInput = {},
): Promise<ProductListViewModel> {
  const { filters = {}, page = 1, pageSize = 10 } = input;
  const locale = await getLocale();

  try {
    // Create cache key based on input
    const cacheKey = `products:${JSON.stringify({ filters, page, pageSize })}`;

    const fetchProducts = unstable_cache(
      async () => {
        const result = await container.listProductsUseCase.execute({
          filters: {
            searchTerm: filters.searchTerm,
            categoryId: filters.categoryId,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            isActive: filters.isActive,
          },
          pagination: { page, pageSize },
        });

        return mapProductListToViewModel(result, locale);
      },
      [cacheKey],
      {
        revalidate: 60, // Cache for 60 seconds
        tags: ["products"],
      },
    );

    return fetchProducts();
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
```

#### `src/app/products/_actions/getProduct.action.ts`

```typescript
"use server";

import { container } from "@/shared/container/container";
import { mapProductToViewModel } from "../_lib/productViewMapper";
import { ProductViewModel } from "../_types/ProductViewModel";
import { getLocale } from "next-intl/server";
import { unstable_cache } from "next/cache";
import * as Sentry from "@sentry/nextjs";

/**
 * Server Action to fetch a single product by ID.
 */
export async function getProduct(id: string): Promise<ProductViewModel | null> {
  const locale = await getLocale();

  try {
    const fetchProduct = unstable_cache(
      async () => {
        const product = await container.getProductUseCase.execute({ id });
        return mapProductToViewModel(product, locale);
      },
      [`product:${id}`],
      {
        revalidate: 60,
        tags: ["products", `product:${id}`],
      },
    );

    return fetchProduct();
  } catch (error) {
    if ((error as Error).name === "ProductNotFoundError") {
      return null;
    }
    Sentry.captureException(error);
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}
```

#### `src/app/products/_actions/createProduct.action.ts`

```typescript
"use server";

import { z } from "zod";
import { container } from "@/shared/container/container";
import { mapProductToViewModel } from "../_lib/productViewMapper";
import { ProductViewModel } from "../_types/ProductViewModel";
import { revalidateTag } from "next/cache";
import { getLocale } from "next-intl/server";
import * as Sentry from "@sentry/nextjs";

// Validation schema
const createProductSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  categoryId: z.string().uuid(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

interface CreateProductResult {
  success: boolean;
  data?: ProductViewModel;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

/**
 * Server Action to create a new product.
 */
export async function createProduct(
  input: CreateProductInput,
): Promise<CreateProductResult> {
  const locale = await getLocale();

  // Validate input
  const validation = createProductSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  try {
    const product = await container.createProductUseCase.execute(
      validation.data,
    );

    // Invalidate products cache
    revalidateTag("products");

    return {
      success: true,
      data: mapProductToViewModel(product, locale),
    };
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error creating product:", error);

    return {
      success: false,
      error: (error as Error).message || "Failed to create product",
    };
  }
}
```

#### `src/app/products/_actions/updateProduct.action.ts`

```typescript
"use server";

import { z } from "zod";
import { container } from "@/shared/container/container";
import { mapProductToViewModel } from "../_lib/productViewMapper";
import { ProductViewModel } from "../_types/ProductViewModel";
import { revalidateTag } from "next/cache";
import { getLocale } from "next-intl/server";
import * as Sentry from "@sentry/nextjs";

const updateProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  stock: z.number().int().min(0).optional(),
  categoryId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;

interface UpdateProductResult {
  success: boolean;
  data?: ProductViewModel;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

/**
 * Server Action to update an existing product.
 */
export async function updateProduct(
  input: UpdateProductInput,
): Promise<UpdateProductResult> {
  const locale = await getLocale();

  const validation = updateProductSchema.safeParse(input);
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const { id, ...data } = validation.data;

  try {
    const product = await container.updateProductUseCase.execute({ id, data });

    // Invalidate caches
    revalidateTag("products");
    revalidateTag(`product:${id}`);

    return {
      success: true,
      data: mapProductToViewModel(product, locale),
    };
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error updating product:", error);

    return {
      success: false,
      error: (error as Error).message || "Failed to update product",
    };
  }
}
```

#### `src/app/products/_actions/deleteProduct.action.ts`

```typescript
"use server";

import { container } from "@/shared/container/container";
import { revalidateTag } from "next/cache";
import * as Sentry from "@sentry/nextjs";

interface DeleteProductResult {
  success: boolean;
  error?: string;
}

/**
 * Server Action to delete (deactivate) a product.
 */
export async function deleteProduct(id: string): Promise<DeleteProductResult> {
  try {
    await container.deleteProductUseCase.execute({ id });

    // Invalidate caches
    revalidateTag("products");
    revalidateTag(`product:${id}`);

    return { success: true };
  } catch (error) {
    Sentry.captureException(error);
    console.error("Error deleting product:", error);

    return {
      success: false,
      error: (error as Error).message || "Failed to delete product",
    };
  }
}
```

#### 4.4. Hooks: `src/app/products/_hooks/useProductList.ts`

```typescript
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { getProducts } from "../_actions/getProducts.action";
import { deleteProduct } from "../_actions/deleteProduct.action";
import {
  ProductListViewModel,
  ProductFiltersViewModel,
} from "../_types/ProductViewModel";

interface UseProductListOptions {
  initialData?: ProductListViewModel;
  initialFilters?: ProductFiltersViewModel;
  pageSize?: number;
}

/**
 * Hook for managing product list state and operations.
 */
export function useProductList(options: UseProductListOptions = {}) {
  const { initialData, initialFilters = {}, pageSize = 10 } = options;
  const queryClient = useQueryClient();

  const [filters, setFilters] =
    useState<ProductFiltersViewModel>(initialFilters);
  const [page, setPage] = useState(1);

  // Fetch products query
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["products", filters, page, pageSize],
    queryFn: () => getProducts({ filters, page, pageSize }),
    initialData,
    staleTime: 60 * 1000, // 1 minute
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // Filter handlers
  const updateFilters = useCallback(
    (newFilters: Partial<ProductFiltersViewModel>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
      setPage(1); // Reset to first page when filters change
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters({});
    setPage(1);
  }, []);

  // Pagination handlers
  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    if (data?.pagination.hasNextPage) {
      setPage((p) => p + 1);
    }
  }, [data?.pagination.hasNextPage]);

  const previousPage = useCallback(() => {
    if (data?.pagination.hasPreviousPage) {
      setPage((p) => p - 1);
    }
  }, [data?.pagination.hasPreviousPage]);

  // Delete handler
  const handleDelete = useCallback(
    async (id: string) => {
      return deleteMutation.mutateAsync(id);
    },
    [deleteMutation],
  );

  return {
    // Data
    products: data?.products ?? [],
    pagination: data?.pagination ?? null,
    filters,

    // Loading states
    isLoading,
    isError,
    error,
    isDeleting: deleteMutation.isPending,

    // Actions
    updateFilters,
    clearFilters,
    goToPage,
    nextPage,
    previousPage,
    handleDelete,
    refetch,
  };
}
```

#### `src/app/products/_hooks/useProductForm.ts`

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import {
  createProduct,
  CreateProductInput,
} from "../_actions/createProduct.action";
import {
  updateProduct,
  UpdateProductInput,
} from "../_actions/updateProduct.action";
import { ProductViewModel } from "../_types/ProductViewModel";

// Form schema with i18n error messages
const createFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(3, t("validation.nameMin"))
      .max(255, t("validation.nameMax")),
    description: z.string().min(1, t("validation.descriptionRequired")),
    price: z.coerce.number().min(0, t("validation.priceMin")),
    stock: z.coerce.number().int().min(0, t("validation.stockMin")),
    categoryId: z.string().uuid(t("validation.categoryRequired")),
  });

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

interface UseProductFormOptions {
  product?: ProductViewModel;
  onSuccess?: (product: ProductViewModel) => void;
}

/**
 * Hook for managing product form state and submission.
 */
export function useProductForm(options: UseProductFormOptions = {}) {
  const { product, onSuccess } = options;
  const t = useTranslations("products.form");
  const queryClient = useQueryClient();

  const isEditing = !!product;
  const schema = createFormSchema(t);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      stock: product?.stock ?? 0,
      categoryId: product?.categoryId ?? "",
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateProductInput) => createProduct(data),
    onSuccess: (result) => {
      if (result.success && result.data) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        form.reset();
        onSuccess?.(result.data);
      }
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateProductInput) => updateProduct(data),
    onSuccess: (result) => {
      if (result.success && result.data) {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        queryClient.invalidateQueries({ queryKey: ["product", product?.id] });
        onSuccess?.(result.data);
      }
    },
  });

  const mutation = isEditing ? updateMutation : createMutation;

  const onSubmit = form.handleSubmit(async (data) => {
    if (isEditing && product) {
      const result = await updateMutation.mutateAsync({
        id: product.id,
        ...data,
      });
      if (!result.success && result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, errors]) => {
          form.setError(field as keyof FormData, { message: errors[0] });
        });
      }
    } else {
      const result = await createMutation.mutateAsync(data);
      if (!result.success && result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, errors]) => {
          form.setError(field as keyof FormData, { message: errors[0] });
        });
      }
    }
  });

  return {
    form,
    onSubmit,
    isSubmitting: mutation.isPending,
    isEditing,
    serverError: mutation.data?.success === false ? mutation.data.error : null,
  };
}
```

#### 4.5. Componentes: `src/app/products/_components/ProductList.tsx`

```typescript
'use client';

import { useTranslations } from 'next-intl';
import { ProductViewModel } from '../_types/ProductViewModel';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { ProductListSkeleton } from './ProductListSkeleton';
import { Pagination } from '@/components/Pagination';
import { useProductList } from '../_hooks/useProductList';

interface ProductListProps {
  initialData?: {
    products: ProductViewModel[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export function ProductList({ initialData }: ProductListProps) {
  const t = useTranslations('products');
  const {
    products,
    pagination,
    filters,
    isLoading,
    isError,
    isDeleting,
    updateFilters,
    clearFilters,
    goToPage,
    handleDelete,
  } = useProductList({ initialData });

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-lg bg-red-50 p-4 text-red-800"
      >
        <p>{t('errors.loadFailed')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProductFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onClearFilters={clearFilters}
      />

      {isLoading ? (
        <ProductListSkeleton count={6} />
      ) : products.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <p>{t('emptyState.title')}</p>
          <p className="mt-1 text-sm">{t('emptyState.description')}</p>
        </div>
      ) : (
        <>
          <ul
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-label={t('list.ariaLabel')}
          >
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  onDelete={handleDelete}
                  isDeleting={isDeleting}
                />
              </li>
            ))}
          </ul>

          {pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={goToPage}
            />
          )}
        </>
      )}
    </div>
  );
}
```

#### `src/app/products/_components/ProductCard.tsx`

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ProductViewModel } from '../_types/ProductViewModel';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Pencil, Trash2 } from 'lucide-react';

interface ProductCardProps {
  product: ProductViewModel;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
  isDeleting: boolean;
}

export function ProductCard({ product, onDelete, isDeleting }: ProductCardProps) {
  const t = useTranslations('products.card');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const stockStatusColors = {
    in_stock: 'bg-green-100 text-green-800',
    low_stock: 'bg-yellow-100 text-yellow-800',
    out_of_stock: 'bg-red-100 text-red-800',
  };

  const stockStatusLabels = {
    in_stock: t('stock.inStock'),
    low_stock: t('stock.lowStock'),
    out_of_stock: t('stock.outOfStock'),
  };

  const handleDelete = async () => {
    const result = await onDelete(product.id);
    if (result.success) {
      setIsDialogOpen(false);
    }
  };

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <Badge
            variant="secondary"
            className={stockStatusColors[product.stockStatus]}
          >
            {stockStatusLabels[product.stockStatus]}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">{t('price')}</span>
            <span className="font-semibold">{product.formattedPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t('stock')}</span>
            <span>{product.stock} {t('units')}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          asChild
        >
          <Link href={`/products/${product.id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
            {t('actions.edit')}
          </Link>
        </Button>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{t('actions.delete')}</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('deleteDialog.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('deleteDialog.description', { name: product.name })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('deleteDialog.cancel')}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? t('deleteDialog.deleting') : t('deleteDialog.confirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
```

#### `src/app/products/_components/ProductFilters.tsx`

```typescript
'use client';

import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ProductFiltersViewModel } from '../_types/ProductViewModel';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface ProductFiltersProps {
  filters: ProductFiltersViewModel;
  onFiltersChange: (filters: Partial<ProductFiltersViewModel>) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: ProductFiltersProps) {
  const t = useTranslations('products.filters');

  const handleSearchChange = useDebounce((value: string) => {
    onFiltersChange({ searchTerm: value || undefined });
  }, 300);

  const handleStatusChange = useCallback(
    (value: string) => {
      onFiltersChange({
        isActive: value === 'all' ? undefined : value === 'active',
      });
    },
    [onFiltersChange]
  );

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined
  );

  return (
    <div
      className="rounded-lg border bg-white p-4"
      role="search"
      aria-label={t('ariaLabel')}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <Label htmlFor="search">{t('search.label')}</Label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <Input
              id="search"
              type="search"
              placeholder={t('search.placeholder')}
              defaultValue={filters.searchTerm ?? ''}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="w-full space-y-2 sm:w-48">
          <Label htmlFor="status">{t('status.label')}</Label>
          <Select
            value={
              filters.isActive === undefined
                ? 'all'
                : filters.isActive
                  ? 'active'
                  : 'inactive'
            }
            onValueChange={handleStatusChange}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder={t('status.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('status.all')}</SelectItem>
              <SelectItem value="active">{t('status.active')}</SelectItem>
              <SelectItem value="inactive">{t('status.inactive')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="self-end"
          >
            <X className="mr-2 h-4 w-4" aria-hidden="true" />
            {t('clearFilters')}
          </Button>
        )}
      </div>
    </div>
  );
}
```

#### `src/app/products/_components/ProductForm.tsx`

```typescript
'use client';

import { useTranslations } from 'next-intl';
import { useProductForm } from '../_hooks/useProductForm';
import { ProductViewModel } from '../_types/ProductViewModel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface ProductFormProps {
  product?: ProductViewModel;
  categories: Array<{ id: string; name: string }>;
  onSuccess?: (product: ProductViewModel) => void;
  onCancel?: () => void;
}

export function ProductForm({
  product,
  categories,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const t = useTranslations('products.form');
  const { form, onSubmit, isSubmitting, isEditing, serverError } = useProductForm({
    product,
    onSuccess,
  });

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const selectedCategoryId = watch('categoryId');

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {serverError && (
        <Alert variant="destructive">
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">{t('fields.name.label')}</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder={t('fields.name.placeholder')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t('fields.description.label')}</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder={t('fields.description.placeholder')}
          rows={4}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description && (
          <p id="description-error" className="text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">{t('fields.price.label')}</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            {...register('price')}
            placeholder={t('fields.price.placeholder')}
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? 'price-error' : undefined}
          />
          {errors.price && (
            <p id="price-error" className="text-sm text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">{t('fields.stock.label')}</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            {...register('stock')}
            placeholder={t('fields.stock.placeholder')}
            aria-invalid={!!errors.stock}
            aria-describedby={errors.stock ? 'stock-error' : undefined}
          />
          {errors.stock && (
            <p id="stock-error" className="text-sm text-red-500">
              {errors.stock.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">{t('fields.category.label')}</Label>
        <Select
          value={selectedCategoryId}
          onValueChange={(value) => setValue('categoryId', value)}
        >
          <SelectTrigger
            id="categoryId"
            aria-invalid={!!errors.categoryId}
            aria-describedby={errors.categoryId ? 'category-error' : undefined}
          >
            <SelectValue placeholder={t('fields.category.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && (
          <p id="category-error" className="text-sm text-red-500">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          {isEditing ? t('actions.update') : t('actions.create')}
        </Button>

        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('actions.cancel')}
          </Button>
        )}
      </div>
    </form>
  );
}
```

#### `src/app/products/_components/ProductListSkeleton.tsx`

```typescript
import { Skeleton } from '@/components/ui/skeleton';

interface ProductListSkeletonProps {
  count?: number;
}

export function ProductListSkeleton({ count = 6 }: ProductListSkeletonProps) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col rounded-lg border bg-white p-6"
        >
          <div className="flex items-start justify-between gap-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-2/3" />

          <div className="mt-6 space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

#### 4.6. Páginas: `src/app/products/page.tsx`

```typescript
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { ProductList } from './_components/ProductList';
import { ProductListSkeleton } from './_components/ProductListSkeleton';
import { getProducts } from './_actions/getProducts.action';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export async function generateMetadata() {
  const t = await getTranslations('products');
  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

async function ProductListContainer() {
  const initialData = await getProducts({ page: 1, pageSize: 10 });
  return <ProductList initialData={initialData} />;
}

export default async function ProductsPage() {
  const t = await getTranslations('products');

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('page.title')}</h1>
          <p className="mt-1 text-gray-500">{t('page.description')}</p>
        </div>
        <Button asChild>
          <Link href="/products/new">
            <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
            {t('actions.create')}
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductListContainer />
      </Suspense>
    </main>
  );
}
```

#### `src/app/products/layout.tsx`

```typescript
import { ReactNode } from 'react';

interface ProductsLayoutProps {
  children: ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
```

#### `src/app/products/loading.tsx`

```typescript
import { ProductListSkeleton } from './_components/ProductListSkeleton';

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-9 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-5 w-64 animate-pulse rounded bg-gray-200" />
      </div>
      <ProductListSkeleton />
    </div>
  );
}
```

#### `src/app/products/error.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import * as Sentry from '@sentry/nextjs';

interface ProductsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductsError({ error, reset }: ProductsErrorProps) {
  const t = useTranslations('products.errors');

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[400px] flex-col items-center justify-center px-4 py-8">
      <AlertCircle className="h-12 w-12 text-red-500" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-semibold">{t('pageError.title')}</h2>
      <p className="mt-2 text-center text-gray-500">{t('pageError.description')}</p>
      <Button onClick={reset} className="mt-6">
        <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
        {t('pageError.retry')}
      </Button>
    </div>
  );
}
```

#### `src/app/products/new/page.tsx`

```typescript
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { ProductForm } from '../_components/ProductForm';
import { getCategories } from '../_actions/getCategories.action';

export async function generateMetadata() {
  const t = await getTranslations('products');
  return {
    title: t('metadata.createTitle'),
    description: t('metadata.createDescription'),
  };
}

export default async function NewProductPage() {
  const t = await getTranslations('products');
  const categories = await getCategories();

  async function handleSuccess() {
    'use server';
    redirect('/products');
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">{t('create.title')}</h1>
        <div className="rounded-lg border bg-white p-6">
          <ProductForm
            categories={categories}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </main>
  );
}
```

#### `src/app/products/[id]/edit/page.tsx`

```typescript
import { notFound, redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ProductForm } from '../../_components/ProductForm';
import { getProduct } from '../../_actions/getProduct.action';
import { getCategories } from '../../_actions/getCategories.action';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditProductPageProps) {
  const { id } = await params;
  const t = await getTranslations('products');
  const product = await getProduct(id);

  if (!product) {
    return { title: t('metadata.notFound') };
  }

  return {
    title: t('metadata.editTitle', { name: product.name }),
    description: t('metadata.editDescription', { name: product.name }),
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const t = await getTranslations('products');
  const [product, categories] = await Promise.all([
    getProduct(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  async function handleSuccess() {
    'use server';
    redirect('/products');
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">
          {t('edit.title', { name: product.name })}
        </h1>
        <div className="rounded-lg border bg-white p-6">
          <ProductForm
            product={product}
            categories={categories}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </main>
  );
}
```

---

### 5. API Routes (`src/app/api/`)

#### `src/app/api/products/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { container } from "@/shared/container/container";
import {
  mapProductListToViewModel,
  mapProductToViewModel,
} from "@/app/products/_lib/productViewMapper";
import * as Sentry from "@sentry/nextjs";

// GET /api/products - List products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters = {
      searchTerm: searchParams.get("search") ?? undefined,
      categoryId: searchParams.get("categoryId") ?? undefined,
      isActive: searchParams.has("isActive")
        ? searchParams.get("isActive") === "true"
        : undefined,
      minPrice: searchParams.has("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.has("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
    };

    const pagination = {
      page: Number(searchParams.get("page") ?? 1),
      pageSize: Number(searchParams.get("pageSize") ?? 10),
    };

    const result = await container.listProductsUseCase.execute({
      filters,
      pagination,
    });

    const viewModel = mapProductListToViewModel(result);

    return NextResponse.json(viewModel);
  } catch (error) {
    Sentry.captureException(error);
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/products - Create product
const createProductSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(1),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  categoryId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createProductSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 },
      );
    }

    const product = await container.createProductUseCase.execute(
      validation.data,
    );
    const viewModel = mapProductToViewModel(product);

    return NextResponse.json(viewModel, { status: 201 });
  } catch (error) {
    Sentry.captureException(error);
    console.error("POST /api/products error:", error);

    if ((error as Error).message.includes("already exists")) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

#### `src/app/api/products/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { container } from "@/shared/container/container";
import { mapProductToViewModel } from "@/app/products/_lib/productViewMapper";
import * as Sentry from "@sentry/nextjs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/products/[id] - Get single product
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const product = await container.getProductUseCase.execute({ id });
    const viewModel = mapProductToViewModel(product);

    return NextResponse.json(viewModel);
  } catch (error) {
    if ((error as Error).name === "ProductNotFoundError") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    Sentry.captureException(error);
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PATCH /api/products/[id] - Update product
const updateProductSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  stock: z.number().int().min(0).optional(),
  categoryId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validation = updateProductSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 },
      );
    }

    const product = await container.updateProductUseCase.execute({
      id,
      data: validation.data,
    });

    const viewModel = mapProductToViewModel(product);
    return NextResponse.json(viewModel);
  } catch (error) {
    if ((error as Error).name === "ProductNotFoundError") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    Sentry.captureException(error);
    console.error("PATCH /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await container.deleteProductUseCase.execute({ id });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if ((error as Error).name === "ProductNotFoundError") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    Sentry.captureException(error);
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

---

### 6. Internacionalização (`src/messages/`)

#### `src/messages/pt-BR/products.json`

```json
{
  "metadata": {
    "title": "Produtos",
    "description": "Gerencie seus produtos",
    "createTitle": "Novo Produto",
    "createDescription": "Adicione um novo produto ao catálogo",
    "editTitle": "Editar {name}",
    "editDescription": "Edite as informações do produto {name}",
    "notFound": "Produto não encontrado"
  },
  "page": {
    "title": "Produtos",
    "description": "Gerencie todos os seus produtos aqui"
  },
  "create": {
    "title": "Novo Produto"
  },
  "edit": {
    "title": "Editar {name}"
  },
  "list": {
    "ariaLabel": "Lista de produtos"
  },
  "emptyState": {
    "title": "Nenhum produto encontrado",
    "description": "Comece adicionando seu primeiro produto"
  },
  "actions": {
    "create": "Novo Produto"
  },
  "card": {
    "price": "Preço",
    "stock": "Estoque",
    "units": "unidades",
    "stock.inStock": "Em estoque",
    "stock.lowStock": "Estoque baixo",
    "stock.outOfStock": "Sem estoque",
    "actions.edit": "Editar",
    "actions.delete": "Excluir",
    "deleteDialog.title": "Excluir produto",
    "deleteDialog.description": "Tem certeza que deseja excluir \"{name}\"? Esta ação não pode ser desfeita.",
    "deleteDialog.cancel": "Cancelar",
    "deleteDialog.confirm": "Excluir",
    "deleteDialog.deleting": "Excluindo..."
  },
  "filters": {
    "ariaLabel": "Filtros de produtos",
    "search.label": "Buscar",
    "search.placeholder": "Buscar produtos...",
    "status.label": "Status",
    "status.placeholder": "Selecione um status",
    "status.all": "Todos",
    "status.active": "Ativos",
    "status.inactive": "Inativos",
    "clearFilters": "Limpar filtros"
  },
  "form": {
    "fields.name.label": "Nome",
    "fields.name.placeholder": "Digite o nome do produto",
    "fields.description.label": "Descrição",
    "fields.description.placeholder": "Digite a descrição do produto",
    "fields.price.label": "Preço",
    "fields.price.placeholder": "0,00",
    "fields.stock.label": "Estoque",
    "fields.stock.placeholder": "0",
    "fields.category.label": "Categoria",
    "fields.category.placeholder": "Selecione uma categoria",
    "validation.nameMin": "O nome deve ter pelo menos 3 caracteres",
    "validation.nameMax": "O nome deve ter no máximo 255 caracteres",
    "validation.descriptionRequired": "A descrição é obrigatória",
    "validation.priceMin": "O preço deve ser maior ou igual a zero",
    "validation.stockMin": "O estoque deve ser maior ou igual a zero",
    "validation.categoryRequired": "Selecione uma categoria válida",
    "actions.create": "Criar Produto",
    "actions.update": "Salvar Alterações",
    "actions.cancel": "Cancelar"
  },
  "errors": {
    "loadFailed": "Erro ao carregar produtos. Tente novamente.",
    "pageError.title": "Algo deu errado",
    "pageError.description": "Não foi possível carregar os produtos. Por favor, tente novamente.",
    "pageError.retry": "Tentar novamente"
  }
}
```

#### `src/messages/en/products.json`

```json
{
  "metadata": {
    "title": "Products",
    "description": "Manage your products",
    "createTitle": "New Product",
    "createDescription": "Add a new product to the catalog",
    "editTitle": "Edit {name}",
    "editDescription": "Edit the product information for {name}",
    "notFound": "Product not found"
  },
  "page": {
    "title": "Products",
    "description": "Manage all your products here"
  },
  "create": {
    "title": "New Product"
  },
  "edit": {
    "title": "Edit {name}"
  },
  "list": {
    "ariaLabel": "Product list"
  },
  "emptyState": {
    "title": "No products found",
    "description": "Get started by adding your first product"
  },
  "actions": {
    "create": "New Product"
  },
  "card": {
    "price": "Price",
    "stock": "Stock",
    "units": "units",
    "stock.inStock": "In stock",
    "stock.lowStock": "Low stock",
    "stock.outOfStock": "Out of stock",
    "actions.edit": "Edit",
    "actions.delete": "Delete",
    "deleteDialog.title": "Delete product",
    "deleteDialog.description": "Are you sure you want to delete \"{name}\"? This action cannot be undone.",
    "deleteDialog.cancel": "Cancel",
    "deleteDialog.confirm": "Delete",
    "deleteDialog.deleting": "Deleting..."
  },
  "filters": {
    "ariaLabel": "Product filters",
    "search.label": "Search",
    "search.placeholder": "Search products...",
    "status.label": "Status",
    "status.placeholder": "Select a status",
    "status.all": "All",
    "status.active": "Active",
    "status.inactive": "Inactive",
    "clearFilters": "Clear filters"
  },
  "form": {
    "fields.name.label": "Name",
    "fields.name.placeholder": "Enter product name",
    "fields.description.label": "Description",
    "fields.description.placeholder": "Enter product description",
    "fields.price.label": "Price",
    "fields.price.placeholder": "0.00",
    "fields.stock.label": "Stock",
    "fields.stock.placeholder": "0",
    "fields.category.label": "Category",
    "fields.category.placeholder": "Select a category",
    "validation.nameMin": "Name must be at least 3 characters",
    "validation.nameMax": "Name must be at most 255 characters",
    "validation.descriptionRequired": "Description is required",
    "validation.priceMin": "Price must be zero or greater",
    "validation.stockMin": "Stock must be zero or greater",
    "validation.categoryRequired": "Please select a valid category",
    "actions.create": "Create Product",
    "actions.update": "Save Changes",
    "actions.cancel": "Cancel"
  },
  "errors": {
    "loadFailed": "Failed to load products. Please try again.",
    "pageError.title": "Something went wrong",
    "pageError.description": "Unable to load products. Please try again.",
    "pageError.retry": "Try again"
  }
}
```

#### `src/messages/es/products.json`

```json
{
  "metadata": {
    "title": "Productos",
    "description": "Gestiona tus productos",
    "createTitle": "Nuevo Producto",
    "createDescription": "Añade un nuevo producto al catálogo",
    "editTitle": "Editar {name}",
    "editDescription": "Edita la información del producto {name}",
    "notFound": "Producto no encontrado"
  },
  "page": {
    "title": "Productos",
    "description": "Gestiona todos tus productos aquí"
  },
  "create": {
    "title": "Nuevo Producto"
  },
  "edit": {
    "title": "Editar {name}"
  },
  "list": {
    "ariaLabel": "Lista de productos"
  },
  "emptyState": {
    "title": "No se encontraron productos",
    "description": "Comienza añadiendo tu primer producto"
  },
  "actions": {
    "create": "Nuevo Producto"
  },
  "card": {
    "price": "Precio",
    "stock": "Stock",
    "units": "unidades",
    "stock.inStock": "En stock",
    "stock.lowStock": "Stock bajo",
    "stock.outOfStock": "Sin stock",
    "actions.edit": "Editar",
    "actions.delete": "Eliminar",
    "deleteDialog.title": "Eliminar producto",
    "deleteDialog.description": "¿Estás seguro de que deseas eliminar \"{name}\"? Esta acción no se puede deshacer.",
    "deleteDialog.cancel": "Cancelar",
    "deleteDialog.confirm": "Eliminar",
    "deleteDialog.deleting": "Eliminando..."
  },
  "filters": {
    "ariaLabel": "Filtros de productos",
    "search.label": "Buscar",
    "search.placeholder": "Buscar productos...",
    "status.label": "Estado",
    "status.placeholder": "Selecciona un estado",
    "status.all": "Todos",
    "status.active": "Activos",
    "status.inactive": "Inactivos",
    "clearFilters": "Limpiar filtros"
  },
  "form": {
    "fields.name.label": "Nombre",
    "fields.name.placeholder": "Ingresa el nombre del producto",
    "fields.description.label": "Descripción",
    "fields.description.placeholder": "Ingresa la descripción del producto",
    "fields.price.label": "Precio",
    "fields.price.placeholder": "0,00",
    "fields.stock.label": "Stock",
    "fields.stock.placeholder": "0",
    "fields.category.label": "Categoría",
    "fields.category.placeholder": "Selecciona una categoría",
    "validation.nameMin": "El nombre debe tener al menos 3 caracteres",
    "validation.nameMax": "El nombre debe tener como máximo 255 caracteres",
    "validation.descriptionRequired": "La descripción es obligatoria",
    "validation.priceMin": "El precio debe ser mayor o igual a cero",
    "validation.stockMin": "El stock debe ser mayor o igual a cero",
    "validation.categoryRequired": "Selecciona una categoría válida",
    "actions.create": "Crear Producto",
    "actions.update": "Guardar Cambios",
    "actions.cancel": "Cancelar"
  },
  "errors": {
    "loadFailed": "Error al cargar productos. Inténtalo de nuevo.",
    "pageError.title": "Algo salió mal",
    "pageError.description": "No se pudieron cargar los productos. Por favor, inténtalo de nuevo.",
    "pageError.retry": "Intentar de nuevo"
  }
}
```

---

### 7. Hooks Globais Reutilizáveis (`src/hooks/`)

#### `src/hooks/useDebounce.ts`

```typescript
"use client";

import { useCallback, useRef } from "react";

/**
 * Hook that debounces a callback function.
 * @param callback - The function to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns A debounced version of the callback
 */
export function useDebounce<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number,
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  ) as T;

  return debouncedCallback;
}
```

---

### 8. Componentes Globais (`src/components/`)

#### `src/components/Pagination.tsx`

```typescript
'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations('common.pagination');

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('ellipsis');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label={t('ariaLabel')}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(1)}
        disabled={!canGoPrevious}
        aria-label={t('firstPage')}
      >
        <ChevronsLeft className="h-4 w-4" aria-hidden="true" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        aria-label={t('previousPage')}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-gray-400"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size="icon"
              onClick={() => onPageChange(page)}
              aria-label={t('goToPage', { page })}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        aria-label={t('nextPage')}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(totalPages)}
        disabled={!canGoNext}
        aria-label={t('lastPage')}
      >
        <ChevronsRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </nav>
  );
}
```

---

### 9. Testes (`src/__tests__/`)

#### `src/__tests__/domain/product/entities/Product.entity.test.ts`

```typescript
import { describe, it, expect } from "vitest";
import { Product } from "@/domain/product/entities/Product.entity";
import { InvalidProductPriceError } from "@/domain/product/errors/InvalidProductPrice.error";
import { InvalidProductNameError } from "@/domain/product/errors/InvalidProductName.error";

describe("Product Entity", () => {
  const validInput = {
    name: "Test Product",
    description: "A test product description",
    price: 99.99,
    stock: 10,
    categoryId: "123e4567-e89b-12d3-a456-426614174000",
  };

  const mockIdGenerator = () => "123e4567-e89b-12d3-a456-426614174001";

  describe("create", () => {
    it("should create a product with valid input", () => {
      const product = Product.create(validInput, mockIdGenerator);

      expect(product.id).toBe(mockIdGenerator());
      expect(product.name).toBe(validInput.name);
      expect(product.description).toBe(validInput.description);
      expect(product.price).toBe(validInput.price);
      expect(product.stock).toBe(validInput.stock);
      expect(product.categoryId).toBe(validInput.categoryId);
      expect(product.isActive).toBe(true);
    });

    it("should throw InvalidProductPriceError for negative price", () => {
      expect(() =>
        Product.create({ ...validInput, price: -10 }, mockIdGenerator),
      ).toThrow(InvalidProductPriceError);
    });

    it("should throw InvalidProductNameError for short name", () => {
      expect(() =>
        Product.create({ ...validInput, name: "ab" }, mockIdGenerator),
      ).toThrow(InvalidProductNameError);
    });

    it("should trim whitespace from name and description", () => {
      const product = Product.create(
        {
          ...validInput,
          name: "  Trimmed Name  ",
          description: "  Trimmed Description  ",
        },
        mockIdGenerator,
      );

      expect(product.name).toBe("Trimmed Name");
      expect(product.description).toBe("Trimmed Description");
    });
  });

  describe("update", () => {
    it("should update product properties", () => {
      const product = Product.create(validInput, mockIdGenerator);
      const originalUpdatedAt = product.updatedAt;

      // Wait a bit to ensure timestamp changes
      product.update({ name: "Updated Name", price: 149.99 });

      expect(product.name).toBe("Updated Name");
      expect(product.price).toBe(149.99);
      expect(product.updatedAt.getTime()).toBeGreaterThanOrEqual(
        originalUpdatedAt.getTime(),
      );
    });

    it("should validate after update", () => {
      const product = Product.create(validInput, mockIdGenerator);

      expect(() => product.update({ price: -5 })).toThrow(
        InvalidProductPriceError,
      );
    });
  });

  describe("stock management", () => {
    it("should decrease stock correctly", () => {
      const product = Product.create(validInput, mockIdGenerator);
      product.decreaseStock(5);

      expect(product.stock).toBe(5);
    });

    it("should throw error for insufficient stock", () => {
      const product = Product.create(validInput, mockIdGenerator);

      expect(() => product.decreaseStock(15)).toThrow("Insufficient stock");
    });

    it("should increase stock correctly", () => {
      const product = Product.create(validInput, mockIdGenerator);
      product.increaseStock(10);

      expect(product.stock).toBe(20);
    });
  });

  describe("activation", () => {
    it("should deactivate product", () => {
      const product = Product.create(validInput, mockIdGenerator);
      product.deactivate();

      expect(product.isActive).toBe(false);
    });

    it("should activate product", () => {
      const product = Product.create(validInput, mockIdGenerator);
      product.deactivate();
      product.activate();

      expect(product.isActive).toBe(true);
    });
  });
});
```

#### `src/__tests__/domain/product/use-cases/CreateProduct.use-case.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { CreateProductUseCase } from "@/domain/product/use-cases/CreateProduct.use-case";
import { ProductRepository } from "@/domain/product/repositories/ProductRepository.interface";
import { IdGenerator } from "@/shared/id/IdGenerator.interface";

describe("CreateProductUseCase", () => {
  let useCase: CreateProductUseCase;
  let mockRepository: ProductRepository;
  let mockIdGenerator: IdGenerator;

  const validInput = {
    name: "New Product",
    description: "Product description",
    price: 99.99,
    stock: 10,
    categoryId: "123e4567-e89b-12d3-a456-426614174000",
  };

  beforeEach(() => {
    mockRepository = {
      findById: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      existsByName: vi.fn().mockResolvedValue(false),
    };

    mockIdGenerator = {
      generate: vi.fn().mockReturnValue("generated-uuid"),
    };

    useCase = new CreateProductUseCase(mockRepository, mockIdGenerator);
  });

  it("should create a product successfully", async () => {
    const product = await useCase.execute(validInput);

    expect(product.id).toBe("generated-uuid");
    expect(product.name).toBe(validInput.name);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });

  it("should throw error if product name already exists", async () => {
    vi.mocked(mockRepository.existsByName).mockResolvedValue(true);

    await expect(useCase.execute(validInput)).rejects.toThrow(
      'Product with name "New Product" already exists.',
    );

    expect(mockRepository.save).not.toHaveBeenCalled();
  });

  it("should generate a new ID for the product", async () => {
    await useCase.execute(validInput);

    expect(mockIdGenerator.generate).toHaveBeenCalledTimes(1);
  });
});
```

---

## Resumo da Arquitetura

| Camada             | Responsabilidade                                         | Dependências          |
| ------------------ | -------------------------------------------------------- | --------------------- |
| **Domain**         | Regras de negócio, entidades, interfaces de repositórios | Nenhuma (núcleo puro) |
| **Infrastructure** | Implementações técnicas (ORM, cache, HTTP)               | Domain, libs externas |
| **Shared**         | Código transversal (utils, errors, DI)                   | Nenhuma ou Domain     |
| **App**            | UI, Server Actions, API Routes, composição               | Domain, Infra, Shared |

### Fluxo de Dados

```
UI Component → Hook → Server Action → Use Case → Repository → Database
     ↑                    ↓               ↓
ViewModel ← Mapper ← Domain Entity ← Persistence Entity
```

### Padrões Aplicados

1. **Clean Architecture**: Separação clara entre domínio e infraestrutura
2. **Repository Pattern**: Abstração de acesso a dados
3. **Use Cases**: Encapsulamento de regras de negócio
4. **Dependency Injection**: Baixo acoplamento via container
5. **DTO/ViewModel**: Separação entre dados de domínio e UI
6. **Error Handling**: Erros tipados e específicos do domínio
7. **Server Actions**: Mutações server-side com revalidação de cache
8. **React Query**: Cache e sincronização de estado no cliente
