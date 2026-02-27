# CLAUDE.md — Portfólio Sergio Monteiro Ribeiro

## Sobre o projeto
Portfólio pessoal de Sergio Monteiro Ribeiro, desenvolvedor Front-end com foco em React e React Native.
Design inspirado no Google Antigravity (https://antigravity.google/) com tema dark.

---

## Arquitetura obrigatória
Leia e siga RIGOROSAMENTE o arquivo `nextjs-architecture-guide.md` antes de criar ou modificar qualquer arquivo.
Consulte-o especialmente para:
- Definir em qual camada cada arquivo deve ser criado (domain / infra / shared / app)
- Seguir os padrões de nomenclatura (PascalCase, kebab-case, camelCase, etc.)
- Adicionar JSDoc em todos os métodos e componentes públicos exportados
- Garantir acessibilidade WCAG 2.1 AA em todos os componentes de UI

---

## Stack do projeto
- Framework: Next.js 15+ (App Router)
- Linguagem: TypeScript (strict mode)
- Estilização: Tailwind CSS + shadcn/ui
- Animações: Framer Motion
- React Compiler: habilitado (experimental.reactCompiler: true no next.config.ts)
- Gerenciador de pacotes: pnpm
- Linting: ESLint + Prettier

---

## Design system
- Background principal: #080808
- Texto principal: #f5f5f5
- Accent / destaque: #6366f1 (indigo) e #8b5cf6 (violet)
- Bordas sutis: rgba(255, 255, 255, 0.06)
- Efeito glow: box-shadow 0 0 40px rgba(99, 102, 241, 0.3)
- Fonte principal: Space Grotesk (Google Fonts)
- Fonte secundária/mono: JetBrains Mono (para trechos de código)
- Estética: minimalista, tipografia grande e impactante, espaço generoso, animações suaves e fluidas

---

## Seções do portfólio
O portfólio deve conter as seguintes seções, nesta ordem:

### 1. Hero
- Nome em destaque: **Sergio Monteiro**
- Subtítulo animado: "Front-end Developer"
- Descrição curta: desenvolvedor com foco em React, React Native e experiência do usuário
- Esferas/orbs flutuantes animadas no fundo (Framer Motion)
- CTA: botão "Ver projetos" e link para LinkedIn/GitHub

### 2. Sobre mim
- Foto de perfil (placeholder até ser fornecida)
- Texto com base no resumo profissional do currículo
- Destaque para: pós-graduação em UX Design (PUCRS), formação em ADS (UMC), inglês avançado
- Experiência atual: NewGo Software House (maio/2022 – atual)

### 3. Projetos em destaque
Cada card deve conter: nome, descrição, stack utilizada, links (App Store, Google Play ou Web).

Projetos para exibir:
- **Inspirar** (USP) — App de tratamento de asma para iOS e Android + sistema web. Stack: React Native, Expo, Geolocalização, Google Health Connect, Recharts, AWS, LogRocket
- **Petro Capital** — App de gestão de investimentos para iOS e Android. Stack: React Native, Expo, React Reanimated, Notificações em tempo real
- **Smiles (Gol)** — Sistema web de busca de voos. Stack: ReactJS, Redux, Context API, Micro frontends, AWS

### 4. Skills / Competências
Tecnologias organizadas por categoria:

**Front-end:** ReactJS, React Native, TypeScript, JavaScript, Next.js, Expo, Context API, Hooks, Redux, Tailwind CSS, Styled Components, CSS/SCSS

**Testes:** Jest, React Testing Library, Cucumber, Cypress

**Design & UX:** Figma, Design Systems, UX/UI, Pós-graduação em UX Design

**Infraestrutura:** Firebase, AWS (Lambda, API Gateway, CloudWatch)

**Outros:** Git, GitLab, GitHub, CI/CD, REST APIs, Micro frontends

### 5. Experiência Profissional
Timeline com:
- **NewGo (Software House)** — Mai/2022 – Atual | Desenvolvedor Front-end Pleno
- **CPQi** — Jan/2021 – Mai/2022 | Desenvolvedor Full Stack Júnior (BTG Pactual / Open Finance)

### 6. Contato
- Email: sergioribeiropalermo@gmail.com
- Telefone: (11) 99897-1796
- GitHub: https://github.com/sergiomonteri
- LinkedIn: https://www.linkedin.com/in/sergiomonteroribeiro
- Formulário de contato simples (nome, email, mensagem) — sem backend por enquanto, apenas visual

---

## Links dos projetos (usar nos cards)
- Inspirar Android: https://play.google.com/store/apps/details?id=br.app.inspirar.mobile
- Inspirar iOS: https://apps.apple.com/br/app/inspirar/id6753951017
- Inspirar Web: https://www.inspirar.app.br/
- Petro Capital Android: https://play.google.com/store/apps/details?id=com.devfactor.petro.prod
- Petro Capital iOS: https://apps.apple.com/br/app/petro-capital/id6752617547
- Smiles Web: https://www.smiles.com.br/home

---

## Regras de implementação

### Componentes
- Componentes globais e reutilizáveis → `src/components/`
- Componentes exclusivos de uma seção → `src/app/_components/` (ou subpasta da seção)
- Todo componente deve ser acessível: aria-labels, semântica HTML correta, contraste adequado
- Nenhum componente de UI deve conter lógica de negócio ou acesso direto a dados

### Animações
- Usar Framer Motion para todas as animações
- Animações de entrada: fade + slide up com stagger entre elementos
- Scroll-triggered: usar `whileInView` + `viewport={{ once: true }}`
- Respeitar `prefers-reduced-motion` para acessibilidade

### Performance
- Imagens com `next/image`
- Fontes com `next/font`
- React Compiler habilitado (evitar useMemo/useCallback manuais)
- Lazy loading em seções abaixo da dobra

### Código
- Todos os arquivos em inglês (nomes, variáveis, comentários, JSDoc)
- Strings de UI podem ser em português (portfólio em PT-BR por padrão)
- Seguir padrão SOLID
- Remover código não utilizado

---

## Checklist antes de cada entrega
- [ ] Arquivo está na pasta correta conforme nextjs-architecture-guide.md?
- [ ] Nomenclatura segue os padrões (PascalCase, kebab-case, etc.)?
- [ ] Componente é acessível (WCAG 2.1 AA)?
- [ ] JSDoc adicionado em métodos/componentes públicos exportados?
- [ ] Animações respeitam prefers-reduced-motion?
- [ ] Sem useMemo/useCallback desnecessários (React Compiler cuida disso)?
- [ ] TypeScript sem erros (strict mode)?
---

## Skills
Leia e aplique as diretrizes de: `.agents/skills/frontend-design/SKILL.md`
