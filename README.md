# Entrelinhas — Clube do Livro Digital

> MVP desenvolvido para a Sprint 2 do curso **Transforme-se | PROA — Desenvolvimento Front-End Online**

## 📖 Sobre o Projeto

**Entrelinhas** é uma plataforma web interativa e responsiva para gerenciamento de leituras e troca de indicações literárias. O MVP permite aos usuários explorar acervos de livros, acompanhar sua estante virtual e cadastrar novos títulos para enriquecer o catálogo da comunidade.

## ✨ Funcionalidades Implementadas

### 🎯 6 Telas Principais (MVP)
1. **Home** — Apresentação da plataforma, banner hero, seção "Histórias Incríveis" e carrossel de sugestões
2. **Explorar Livros** — Busca textual, filtros por categoria e status, grid/lista responsiva
3. **Minha Estante** — Painel do usuário com leituras em andamento, avaliações e controle por status (abas)
4. **Cadastrar Livro** — Formulário completo com validação (título, autor, categoria, ano, sinopse, capa)
5. **Login** — Autenticação com e-mail/senha, "lembrar-me", toggle de visibilidade de senha
6. **Cadastro** — Registro de novos usuários (nome, e-mail, senha, confirmação, termos)
7. **Perfil** — Gerenciamento de conta, alteração de senha, estatísticas, zona de perigo

### 🎨 Design System
- **Paleta Oficial**: Vinho (#7C4A5A), Rosa Seco (#D8B4B8), Bege (#FAF7F6), Marrom (#8B4513), Cinza (#333333)
- **Tipografia**: Poppins (títulos) + Inter (corpo)
- **Espaçamento**: Sistema baseado em 4px
- **Componentes**: Botões, Cards, Formulários, Modals, Toasts, Dropdowns, Accordions
- **Acessibilidade**: ARIA labels, foco visível, contraste, navegação por teclado

### 🔧 Recursos Técnicos
- **SPA com roteamento por hash** — Navegação sem recarregamento
- **Persistência localStorage** — Livros, usuários, estante, sessão
- **Validação de formulários** — Tempo real + submissão
- **Notificações Toast** — Sucesso, erro, aviso, info
- **Modais de confirmação** — Ações destrutivas
- **Responsivo** — Mobile-first, breakpoints em 640/768/1024/1280px
- **Menu mobile** — Hamburger com animação
- **Carrossel** — Navegação por scroll/touch
- **Abas acessíveis** — ARIA tablist/tabpanel
- **Redução de movimento** — `prefers-reduced-motion`
- **Alto contraste** — `prefers-contrast: high`

## 📁 Estrutura do Projeto

```
entrelinhas/
├── index.html              # HTML principal (single-page)
├── assets/
│   ├── logo.svg           # Logo vetorial
│   └── favicon.svg        # Favicon
├── css/
│   ├── variables.css      # Design tokens (cores, tipografia, spacing, shadows)
│   ├── reset.css          # Normalize + base styles
│   ├── components.css     # Componentes reutilizáveis
│   ├── screens.css        # Estilos específicos por tela
│   └── main.css           # Importação + utilitários globais
└── js/
    └── app.js             # Aplicação principal (ES Modules)
```

## 🚀 Como Executar

### Opção 1: Servidor Local (Recomendado)
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .

# PHP
php -S localhost:8000
```
Acesse: `http://localhost:8000`

### Opção 2: Abrir Diretamente
Clique duas vezes no arquivo `index.html` (alguns recursos como `localStorage` podem não funcionar via `file://`)

## 💾 Dados Iniciais

O projeto vem com 10 livros pré-cadastrados incluindo:
- 1984 (George Orwell)
- Dom Casmurro (Machado de Assis)
- O Senhor dos Anéis (J.R.R. Tolkien)
- Cem Anos de Solidão (Gabriel García Márquez)
- E mais 6 clássicos da literatura

## 🔐 Autenticação

- **Cadastro**: Cria usuário no localStorage (simulação)
- **Login**: Valida contra usuários salvos
- **Sessão**: Persiste via `localStorage` (lembrar-me) ou `sessionStorage`
- **Proteção**: Telas restritas redirecionam para login

## 🎯 Próximos Passos (Backlog)

- [ ] Integração com API real (backend)
- [ ] Upload de imagem de capa (não apenas URL)
- [ ] Sistema de recomendações baseado em gênero
- [ ] Comentários e resenhas nos livros
- [ ] Metas de leitura anuais
- [ ] Modo escuro
- [ ] PWA (Service Worker + Manifest)
- [ ] Testes automatizados (Vitest + Playwright)
- [ ] CI/CD (GitHub Actions)

## 🛠 Tecnologias

- **HTML5** semântico + ARIA
- **CSS3** moderno (Custom Properties, Grid, Flexbox, Container Queries)
- **Vanilla JavaScript** (ES Modules, sem dependências)
- **Google Fonts** (Poppins + Inter)
- **SVG** para ícones e ilustrações

## 📱 Compatibilidade

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 👨‍💻 Desenvolvido por

Equipe **Entrelinhas** — Curso Transforme-se | PROA
Desenvolvimento Front-End Online — Sprint 2 (até 18/11/2024)

---

**Licença**: Projeto educacional — Uso livre para fins de aprendizado