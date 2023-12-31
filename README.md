# Setup

docker compose up -d
npx prisma migrate dev

# App

GymPass Style app

## RFs (requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuario logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuario logado;
- [x] Deve ser possível o usuario obter seu historico de check-ins;
- [x] Deve ser possível o usuario buscar academias proximas (até 10km) ;
- [x] Deve ser possível o usuario buscar academias pelo nome;
- [x] Deve ser possível o usuario realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar em uma academia;

# RNs (Regras de negócio)

- [x] O usuario nao deve poder se cadastrar com um email duplicado;
- [x] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [x] O usuario nao pode fazer check-in se nao estiver pccademia;
- [x] O check-in só pode ser validade até 20 minutos aps criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

# RNFs (Requisitos nao-funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicacao precisam estar persistidos em um banco PostgressSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por pagina;
- [x] O usuario deve ser identificado por um JWT (Json Web Token);
