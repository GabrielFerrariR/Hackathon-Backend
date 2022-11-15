<h1 align="center"> Orange Evolution API 🍊 🧡</h1>

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)

</div>

## Sobre

API responsável por alimentar a comunidade Orange Evolution do squad 36 do programa de formação FCamara - Season 4. Faça a manipulação de usuários e de contéudos através das rotas estabelecidas na [documentação do Postman](https://www.postman.com/cloudy-satellite-23795/workspace/hackathon-s4/documentation/24296482-7bebe185-cbcd-4a08-ba0d-992bd52238db?entity=&branch=&version=).

Foi  utilizado a arquitetura MSC para organização da aplicação e o padrão REST para criação da API.

## Tecnologias utilizadas

 - Javascript
- Node.js
- Express.js
- MondoDB
- Mongoose
- Mocha, Chai e Sinon
- Joi

## Documentação

[Documentação do Postman](https://www.postman.com/cloudy-satellite-23795/workspace/hackathon-s4/documentation/24296482-7bebe185-cbcd-4a08-ba0d-992bd52238db?entity=&branch=&version=);


## Rodando o projeto

É necessário que se tenha instalado o MongoD ou sua imagem Docker.

```bash
git clone git@github.com:GabrielFerrariR/Hackathon-Backend.git
cd Hackathon-Backend/
```

Instale as dependências:

```bash
npm install
```

Execute o script de desenvolvimento:

```bash
npm run dev
```

> ⚠️ Utilize suas credenciais do MongoDB como no arquivo env.example

Executando testes unitários:

```bash
npm run test
# para verificar a cobertura de testes
npm run test:coverage
```
