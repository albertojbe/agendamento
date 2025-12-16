# Sistema de Agendamentos

Sistema de agendamento de salas e recursos, desenvolvido para oferecer uma solução simples, objetiva e eficiente no gerenciamento de reservas. A aplicação permite o controle centralizado de horários, recursos disponíveis e agendamentos, proporcionando uma visualização clara e organizada das reservas por meio de uma interface intuitiva e interativa.

## Tecnologias
- ExpressJS 
- VueJS 
- TailwindCSS
- FlyonUI
- Sequelize ORM 
- FullCalendar 
- SQLite 
- JWT
- bcrypt

## Arquitetura

### Backend
O backend é implementado em ExpressJS e é responsável por toda a lógica de negócio e operações transacionais do sistema. Ele disponibiliza uma API RESTful para consumo pelo frontend, garantindo comunicação padronizada e desacoplada.

### Frontend
O frontend é desenvolvido em VueJS, oferecendo uma interface leve, responsiva e dinâmica. A aplicação consome a API backend por meio de requisições assíncronas, permitindo atualização dos dados em tempo real sem recarregamento de página.
Os agendamentos são apresentados de forma visual e intuitiva utilizando o FullCalendar, facilitando a visualização de horários, disponibilidade de salas e organização dos recursos.

## Estrutura de Pastas

```
agendamento/
├── agendamento-back/               # Backend da aplicação
│   ├── app.js                      # Configuração principal da aplicação Express
│   ├── bin/                        # Scripts executáveis
│   ├── config/                     # Configurações globais (banco de dados, etc)
│   ├── db.sqlite                   # Banco de dados SQLite
│   ├── errors/                     # Erros customizados (NotFoundError, UnauthorizedError, etc)
│   ├── middlewares/                # Middlewares Express (autenticação, tratamento de erros)
│   ├── models/                     # Modelos Sequelize (User, Room, Schedule, Resource)
│   ├── package.json                # Dependências do backend
│   ├── public/                     # Arquivos estáticos (imagens das salas)
│   ├── repositories/               # Camada de acesso a dados (ScheduleRepository, RoomRepository, etc)
│   ├── routes/                     # Rotas da API (authRouter, roomRouter, scheduleRouter, etc)
│   ├── schemas/                    # Esquemas de validação
│   ├── services/                   # Camada de lógica de negócio (ScheduleService, RoomService, etc)
│   └── utils/                      # Funções utilitárias (autenticação, hash de senhas, etc)
│
├── agendamento-front/              # Frontend da aplicação
│   ├── global.d.ts                 # Declarações de tipos globais TypeScript
│   ├── index.html                  # Arquivo HTML principal
│   ├── package.json                # Dependências do frontend
│   ├── public/                     # Assets estáticos
│   ├── src/                        # Código-fonte Vue
│   │   ├── components/             # Componentes Vue reutilizáveis
│   │   ├── views/                  # Páginas/views da aplicação
│   │   ├── services/               # Serviços de integração com API
│   │   └── App.vue                 # Componente raiz
│   └── vite.config.js              # Configuração do Vite (build tool)
│
└── README.md                       # Documentação do projeto
```

**Descrição das pastas principais:**

- **agendamento-back**: Contém toda a lógica do backend seguindo padrão MVC adaptado com Services
- **agendamento-front**: Interface do usuário construída com Vue 3 e Vite
- **repositories**: Isolam a lógica de acesso ao banco de dados
- **services**: Contêm regras de negócio e orquestram repositórios
- **routes**: Definem os endpoints da API
- **middlewares**: Tratam autenticação, erros e outras responsabilidades transversais

## Funcionalidades

### Autenticação e Autorização
- Registro de usuários com criptografia de senha (bcrypt)
- Login com geração de JWT
- Validação de token em rotas protegidas
- Persistência de autenticação com cookies

### Gerenciamento de Salas
- Criar, atualizar, deletar e listar salas
- Associar imagens às salas
- Definir capacidade de participantes
- Informações de localização

### Gerenciamento de Recursos
- Criar, atualizar, deletar e listar recursos
- Controlar quantidade disponível de recursos
- Ativar/desativar recursos

### Agendamentos
- Criar agendamentos associando salas ou recursos
- Validação de conflitos de horários
- Validação de capacidade de salas
- Filtrar agendamentos por sala, recurso ou usuário
- Visualização em calendário interativo
- Atualizar e cancelar agendamentos

## Instalação

### Backend
```bash
cd agendamento-back
npm install
npm start
```

### Frontend
```bash
cd agendamento-front
npm install
npm run dev
```

## Variáveis de Ambiente

Criar arquivo `.env` na pasta `agendamento-back`:

```
JWT_SECRET=sua_chave_secreta_aqui
CORS_ORIGIN=dominio_do_front
NODE_ENV=development
PORT=3000
```

## API Endpoints

### Autenticação
- `POST /api/auth/token` - Login
- `POST /api/auth/validate` - Validar token

### Salas
- `GET /api/rooms` - Listar todas as salas
- `GET /api/rooms/:id` - Obter sala específica
- `POST /api/rooms` - Criar sala
- `PUT /api/rooms/:id` - Atualizar sala
- `DELETE /api/rooms/:id` - Deletar sala

### Recursos
- `GET /api/resources` - Listar todos os recursos
- `GET /api/resources/:id` - Obter recurso específico
- `POST /api/resources` - Criar recurso
- `PUT /api/resources/:id` - Atualizar recurso
- `DELETE /api/resources/:id` - Deletar recurso

### Usuários
- `POST /api/users` - Registrar usuário
- `GET /api/users/:id` - Obter dados do usuário
- `PUT /api/users/:id` - Atualizar dados do usuário
- `DELETE /api/users/:id` - Deletar usuário

### Agendamentos
- `GET /api/schedules` - Listar todos os agendamentos
- `GET /api/schedules/:id` - Obter agendamento específico
- `GET /api/schedules/room/:roomId` - Listar agendamentos de uma sala
- `GET /api/schedules/resource/:resourceId` - Listar agendamentos de um recurso
- `GET /api/schedules/user/:userId` - Listar agendamentos do usuário
- `POST /api/schedules` - Criar agendamento
- `PUT /api/schedules/:id` - Atualizar agendamento
- `DELETE /api/schedules/:id` - Cancelar agendamento

## Padrões de Código

- **Arquitetura em camadas**: Separação de responsabilidades com Router → Service → Repository
- **Injeção de Dependência**: Services recebem suas dependências via construtor
- **Tratamento centralizado de erros**: Middleware customizado para tratamento de exceções
- **DTOs**: Data Transfer Objects para validação e transferência de dados
- **Classe de Erros Customizados**: NotFoundError, UnauthorizedError, ValidationError
