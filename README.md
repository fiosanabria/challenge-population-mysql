# Base para proyectos en TypeScript con MySQL :writing_hand:

Este template esta dirigido a todos aquellos que inician en `TyepScript` un proyecto nuevo. Para usarlo, simplemente tienes hacer un `fork` o usar el botón `use this template`.

## Instalación y ejecución

- 🛠Para instalar las dependencias ejecutar el siguiente comando `npm install`

- ⚒Para ejecutar el modo playground o repl, ejecutar el siguiente comando `npm run dev`

- 🔧Para traducir el código en `/src` a `JavaScript` , usar el comando `npm run build`

- 🔑Para ejecutar el código con `Node.js`, usar el comando `npm run start`

- 🧪Para ejecutar los test con jest, usar el comando `npm run test`

- 🧪Para ejecutar los test de cobertura, usar el comando `npm run test:coverage`

## Variables de entorno

- `BDD_HOST`: host de la base de datos, por defecto es `localhost`
- `BDD_USER`: usuario para acceder a la base de datos, por defecto es `root`
- `BDD_PASS`: contraseña para acceder a la base de datos, por defecto es `newpass`

Se puede usar el archivo `.env` para configurar estas variables de entorno en testing y desarrollo. Solo se debe ejecutar el comando `cp .env.example .env`.

## Características

- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [mysql2](https://www.npmjs.com/package/mysql2)
