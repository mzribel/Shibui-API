# Shibui

Fork du projet d'architecture logicielle, les services et modèles de données ne sont qu'indicatifs.

## Prisma 

Le fichier `schema.prisma` fait figure de vérité pour la base de données.
Les modifications structurelles doivent se faire dans ce fichier puis appliquées avec la commande de migration.
```
npx prisma migrate dev --name init
```

Afin d'avoir les entités prisma à jour, à chaque initialisation du projet et modification de la base, il faut mettre le client prisma à jour : 
```
npx prisma generate
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
