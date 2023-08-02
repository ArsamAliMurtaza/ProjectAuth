<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description of this project

The NestJS user authentication system in this repository is a secure and robust solution for user authentication and registration. The system incorporates various components, including user entities, repositories, services, and controllers, to handle user-related operations.

While run this code, please access the following endpoints to test the APIs
<ul>
  POST : localhost:3000/auth/register
  POST : localhost:3000/auth/login
  GET : localhost:3000/auth/profile
  POST : localhost:3000/auth/generateAccessToken
  POST : localhost:3000/auth/logout
</ul>

This system utilizes JWT (JSON Web Tokens) for authentication, ensuring secure transmission of data and enabling stateless authentication.
The `UserEntity` represents the user model, containing attributes such as first name, last name, email, password, and age. The entity is extended from a base class that includes common fields like `id`, `createdAt`, and `updatedAt`.

The `UserRepository` extends the TypeORM `Repository` class and provides methods to find user details by username and save user data. It handles conflicts in username registration and throws a custom `ConflictException` when a duplicate username is detected.

The `UserService` communicates with the repository to perform user-related operations. It includes methods to find a user by username and create a new user based on the provided DTO.

The `AuthService` handles user authentication and token management. It utilizes the `UserService` to validate user credentials during sign-in and generates JWT access and refresh tokens upon successful authentication. It also provides a method to refresh access tokens using a refresh token.

The `AuthGuard` is an authentication guard that allows or denies access to protected routes based on the presence of a valid access token. It verifies the token using the JWT service and throws an `UnauthorizedException` when the token is invalid or missing.

The `AppModule` serves as the entry point for the application. It configures the necessary modules, including TypeORM for database connectivity, and provides the required services and controllers.

These fixes and improvements enhance the functionality and security of the user authentication system. With proper configuration and usage, this system can handle user registration, authentication, and authorization, ensuring a seamless and secure experience for users.

## Installation of NEST

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
## License
Nest is [MIT licensed](LICENSE).
