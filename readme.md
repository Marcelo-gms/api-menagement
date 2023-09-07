# API para gerenciamento de conteúdo do meu portfólio

## Objetivos
O projeto foi desenvolvido para o gerenciamento do meu portfólio, porém se servir para você, fique á vontade para usar como quiser.<br>
Com essa api é possível criar ou remover um administrador do sistema, fazer o crud completo de projetos, inclusive com fotos, esse recurso foi implementado usando o **Multer**. <br>
A autenticação é feita por meio de token **Jwt** e a criptografia de senha com o **Bcrypt**, também é possivel visualizar mensagens enviadas pelos visitantes do portfólio, as mensagens além de serem enviadas para o e-mail com o **Nodemailer**, também são armazenadas no banco de dados **MongoDB** para melhor visualização por meio de uma dashboard.

link of the my project [Portfolio](https://marcelogomes.netlify.app)
___
## Tecnologias
 - Node 
 - Express
 - MongoDB
 - SendMail

___
## Recursos

 - Casdastro e atualização de usuário.
 - Criar, Atualizar, Editar e Exlcuir Projetos.
 - Visualizar mensagens recebidas.

___
## Rotas

### Users
  - **GET**  /users
  ```json
  [
    {
        "_id":"737y3v3yv348b3fb",
        "name":"name user created",
        "email":"teste@teste.com"
    }
  ]
  ```
  - **GET** /users/1
  - **POST** /users
  - **PUT** /users/1
### Projects
  - **GET**  /users
  - **GET** /users/1
  - **POST** /users
  - **PUT** /users/1
### Messages
  - **GET**  /users
  - **GET** /users/1
  - **POST** /users
  - **PUT** /users/1

